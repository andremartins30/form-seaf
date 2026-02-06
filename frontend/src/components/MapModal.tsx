import { useState, useEffect, useRef } from 'react';

interface MapModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: (lat: string, lng: string) => void;
    initialLat?: string;
    initialLng?: string;
}

// Declaração de tipos globais para Leaflet
declare global {
    interface Window {
        L: any;
    }
}

export default function MapModal({ show, onClose, onConfirm, initialLat = '', initialLng = '' }: MapModalProps) {
    const [latitude, setLatitude] = useState(initialLat);
    const [longitude, setLongitude] = useState(initialLng);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    // Coordenadas padrão do Brasil (centro aproximado)
    const DEFAULT_LAT = -13.500;
    const DEFAULT_LNG = -56.000;
    const DEFAULT_ZOOM = 6;

    // Inicializar mapa quando o modal abrir
    useEffect(() => {
        if (show && mapContainerRef.current && window.L) {
            // Limpar mapa existente se houver
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }

            const lat = parseFloat(initialLat) || DEFAULT_LAT;
            const lng = parseFloat(initialLng) || DEFAULT_LNG;
            const zoom = (initialLat && initialLng) ? 13 : DEFAULT_ZOOM;

            setLatitude(initialLat || '');
            setLongitude(initialLng || '');

            // Pequeno delay para garantir que o DOM está pronto
            setTimeout(() => {
                if (!mapContainerRef.current) return;

                // Criar mapa
                const map = window.L.map(mapContainerRef.current).setView([lat, lng], zoom);

                // Adicionar tile layer (OpenStreetMap)
                window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                }).addTo(map);

                // Adicionar marcador inicial se houver coordenadas
                if (initialLat && initialLng) {
                    const marker = window.L.marker([lat, lng], {
                        draggable: true
                    }).addTo(map);

                    // Atualizar coordenadas quando arrastar o marcador
                    marker.on('dragend', function (e: any) {
                        const position = e.target.getLatLng();
                        setLatitude(position.lat.toFixed(6));
                        setLongitude(position.lng.toFixed(6));
                    });

                    markerRef.current = marker;
                }

                // Adicionar marcador ao clicar no mapa
                map.on('click', function (e: any) {
                    const { lat, lng } = e.latlng;

                    setLatitude(lat.toFixed(6));
                    setLongitude(lng.toFixed(6));

                    // Remover marcador anterior se existir
                    if (markerRef.current) {
                        map.removeLayer(markerRef.current);
                    }

                    // Adicionar novo marcador arrastável
                    const marker = window.L.marker([lat, lng], {
                        draggable: true
                    }).addTo(map);

                    // Atualizar coordenadas quando arrastar o marcador
                    marker.on('dragend', function (dragEvent: any) {
                        const position = dragEvent.target.getLatLng();
                        setLatitude(position.lat.toFixed(6));
                        setLongitude(position.lng.toFixed(6));
                    });

                    markerRef.current = marker;
                });

                mapRef.current = map;
            }, 100);
        }

        // Cleanup ao fechar
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
                markerRef.current = null;
            }
        };
    }, [show]);

    const handleLatChange = (value: string) => {
        setLatitude(value);
        updateMapView(value, longitude);
    };

    const handleLngChange = (value: string) => {
        setLongitude(value);
        updateMapView(latitude, value);
    };

    const updateMapView = (lat: string, lng: string) => {
        if (!mapRef.current || !lat || !lng) return;

        const latNum = parseFloat(lat);
        const lngNum = parseFloat(lng);

        if (isNaN(latNum) || isNaN(lngNum)) return;

        // Atualizar visualização do mapa
        mapRef.current.setView([latNum, lngNum], 13);

        // Atualizar ou criar marcador
        if (markerRef.current) {
            markerRef.current.setLatLng([latNum, lngNum]);
        } else {
            const marker = window.L.marker([latNum, lngNum], {
                draggable: true
            }).addTo(mapRef.current);

            marker.on('dragend', function (e: any) {
                const position = e.target.getLatLng();
                setLatitude(position.lat.toFixed(6));
                setLongitude(position.lng.toFixed(6));
            });

            markerRef.current = marker;
        }
    };

    const handleConfirm = () => {
        if (latitude && longitude) {
            onConfirm(latitude, longitude);
            onClose();
        } else {
            alert('Por favor, informe latitude e longitude válidas ou clique no mapa');
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lng = position.coords.longitude.toFixed(6);
                    setLatitude(lat);
                    setLongitude(lng);
                    updateMapView(lat, lng);
                },
                (error) => {
                    console.error('Erro ao obter localização:', error);
                    alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
                }
            );
        } else {
            alert('Geolocalização não é suportada pelo seu navegador');
        }
    };

    if (!show) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 1050 }}
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div
                className="modal fade show"
                style={{ display: 'block', zIndex: 1055 }}
                tabIndex={-1}
            >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Selecionar Localização no Mapa</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3 mb-3">
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold">Latitude</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={latitude}
                                        onChange={(e) => handleLatChange(e.target.value)}
                                        placeholder="Ex: -12.345678"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small fw-semibold">Longitude</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={longitude}
                                        onChange={(e) => handleLngChange(e.target.value)}
                                        placeholder="Ex: -38.123456"
                                    />
                                </div>
                                <div className="col-md-4 d-flex align-items-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary w-100"
                                        onClick={getCurrentLocation}
                                    >
                                        <i className="bi bi-geo-alt-fill me-2"></i>
                                        Usar Minha Localização
                                    </button>
                                </div>
                            </div>

                            <div className="alert alert-info small">
                                <i className="bi bi-info-circle me-2"></i>
                                <strong>Dica:</strong> Clique no mapa para marcar a localização desejada.
                                Você também pode arrastar o marcador ou digitar as coordenadas manualmente nos campos acima.
                            </div>

                            {/* Mapa Leaflet */}
                            <div
                                ref={mapContainerRef}
                                className="border rounded"
                                style={{ height: '450px', width: '100%', cursor: 'crosshair' }}
                            ></div>

                            <div className="mt-3">
                                <small className="text-muted">
                                    <i className="bi bi-pin-map me-1"></i>
                                    Coordenadas selecionadas: <strong>{latitude || '---'}</strong>, <strong>{longitude || '---'}</strong>
                                </small>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleConfirm}
                                disabled={!latitude || !longitude}
                            >
                                <i className="bi bi-check-circle me-2"></i>
                                Confirmar Localização
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
