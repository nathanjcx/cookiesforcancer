const photos = [
  { src: "/care/care-11.jpg", alt: "A doctor speaking with a patient" },
  { src: "/care/care-01.jpg", alt: "A nurse preparing cancer treatment" },
  { src: "/care/care-04.jpg", alt: "A surgical team at work" },
  { src: "/care/care-16.jpg", alt: "A caregiver resting after a long shift" },
  { src: "/care/care-08.jpg", alt: "A researcher at a microscope" },
  { src: "/care/care-18.jpg", alt: "A doctor reviewing a patient chart" },
  { src: "/care/care-06.jpg", alt: "An operating room ready for care" },
];

export function CareCarousel() {
  const frames = [...photos, ...photos];

  return (
    <section className="care-carousel" aria-label="People in cancer care">
      <div className="care-track">
        {frames.map((photo, index) => (
          <figure className="care-frame" key={`${photo.src}-${index}`}>
            <img src={photo.src} alt={index < photos.length ? photo.alt : ""} />
          </figure>
        ))}
      </div>
    </section>
  );
}
