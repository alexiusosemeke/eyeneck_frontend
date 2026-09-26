function LogoImage({
  className = "h-20 w-auto mx-auto object-contain",
  alt = "eyeneck Logo",
}) {
  return (
    <img
      className={className}
      alt={alt}
      src="https://lh3.googleusercontent.com/aida/AP1WRLsPSOUcfVwz2NBr7qpdCNCeQnaAYiDzY6HQj49zjTp5SsPAQLyq3SVZ61xs_wLHmDmumurReHQCGS5_yb1S_wAyLjZ1UJpkSurNAYtyNfQT2z-0xTShqN5TlPh4ht5GtmpV7KeRYhq8YImbOCJIbZZshNG5XX62Vgq_EoiXF3x2rwlWVteZ0oe50R_SviOncsrGLbqqOyXxi75GIjH6ljkTi84CzRJxVOLUYJlJlWJhGO274qI8Bp11wy0"
    />
  );
}

export default LogoImage;
