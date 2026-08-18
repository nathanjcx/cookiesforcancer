const photos = [
  { src: "/care/care-01.png", alt: "A family visiting a patient in the hospital" },
  { src: "/care/care-02.png", alt: "A child in cancer treatment smiling from a hospital bed" },
  { src: "/care/care-03.png", alt: "A researcher looking through a microscope" },
  { src: "/care/care-04.png", alt: "A doctor reviewing care with a patient" },
  { src: "/care/care-05.png", alt: "A clinician reviewing a mammogram" },
  { src: "/care/care-06.png", alt: "A doctor sitting with a patient, holding her hand" },
  { src: "/care/care-07.png", alt: "A nurse holding a patient's hand during treatment" },
];

function PhotoSet({
  labeled,
}: {
  labeled: boolean;
}) {
  return (
    <div className="care-set" aria-hidden={labeled ? undefined : true}>
      {photos.map((photo) => (
        <figure className="care-frame" key={`${labeled ? "a" : "b"}-${photo.src}`}>
          <img
            src={photo.src}
            alt={labeled ? photo.alt : ""}
            draggable={false}
          />
        </figure>
      ))}
    </div>
  );
}

export function CareCarousel() {
  return (
    <div className="care-wrap">
      <section className="care-carousel" aria-label="People in cancer care">
        <div className="care-track">
          <PhotoSet labeled />
          <PhotoSet labeled={false} />
        </div>
      </section>
    </div>
  );
}
