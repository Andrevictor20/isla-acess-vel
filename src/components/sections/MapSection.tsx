import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import { CONTACT, SITE } from "@/lib/constants";
import "leaflet/dist/leaflet.css";

export function MapSection() {
  const [Map, setMap] = useState<null | {
    MapContainer: typeof import("react-leaflet").MapContainer;
    TileLayer: typeof import("react-leaflet").TileLayer;
    Marker: typeof import("react-leaflet").Marker;
    Popup: typeof import("react-leaflet").Popup;
    icon: import("leaflet").Icon;
  }>(null);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const [rl, L] = await Promise.all([
        import("react-leaflet"),
        import("leaflet"),
      ]);
      const icon = new L.Icon({
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      if (!cancel) {
        setMap({
          MapContainer: rl.MapContainer,
          TileLayer: rl.TileLayer,
          Marker: rl.Marker,
          Popup: rl.Popup,
          icon,
        });
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const info = [
    { icon: MapPin, label: "Endereço", value: CONTACT.address },
    { icon: Phone, label: "Telefone", value: CONTACT.phone },
    { icon: Mail, label: "Email", value: CONTACT.email },
  ];

  return (
    <section
      id="localizacao"
      className="bg-muted/40 py-20 md:py-28"
      aria-labelledby="map-heading"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Onde estamos
          </span>
          <h2
            id="map-heading"
            className="mt-3 font-heading text-3xl font-extrabold text-primary md:text-5xl"
          >
            Nossa Localização
          </h2>
          <p className="mt-4 text-muted-foreground">
            {CONTACT.address}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
        >
          <div
            className="h-[300px] w-full bg-muted sm:h-[380px] lg:h-[460px]"
            role="region"
            aria-label={`Mapa da localização do ${SITE.name} em São Luís, Maranhão`}
          >
            {Map ? (
              <Map.MapContainer
                center={[CONTACT.coords.lat, CONTACT.coords.lng]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <Map.TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Map.Marker
                  position={[CONTACT.coords.lat, CONTACT.coords.lng]}
                  icon={Map.icon}
                >
                  <Map.Popup>
                    <strong>{SITE.name}</strong>
                    <br />
                    {CONTACT.address}
                  </Map.Popup>
                </Map.Marker>
              </Map.MapContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Carregando mapa…
              </div>
            )}
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {info.map((i) => (
            <div
              key={i.label}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
                <i.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {i.label}
                </p>
                <p className="mt-0.5 font-semibold text-primary">{i.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
