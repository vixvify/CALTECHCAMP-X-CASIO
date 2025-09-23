<div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 md:px-8">
  <h1
    className="text-white text-center text-sm mt-10 mb-6
               md:text-2xl md:mt-16 md:mb-10
               lg:text-4xl lg:mt-20 lg:mb-20 font-bold"
    id="place"
  >
    สถานที่จัดกิจกรรม
  </h1>

  {/* Container responsive */}
  <div className="w-full max-w-[900px] aspect-video rounded-2xl overflow-hidden shadow-lg">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1630.1078652772692!2d100.49416203012971!3d13.653399726000025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a24d8103a75f%3A0xac86a3dc0e1f8444!2sScience%20Learning%20Space!5e0!3m2!1sth!2sth!4v1758589155366!5m2!1sth!2sth"
      className="w-full h-full"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
