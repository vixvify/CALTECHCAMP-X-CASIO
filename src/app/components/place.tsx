export default function Place() {
  return (
    <div>
        <div>
            <h1 className="text-white justify-center items-center text-4xl mt-30 mb-10">สถานที่จัดกิจกรรม</h1>
        </div>
        <div>
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1938.5345233346632!2d100.4925656318665!3d13.653563775652513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a24d8103a75f%3A0xac86a3dc0e1f8444!2sScience%20Learning%20Space!5e0!3m2!1sth!2sth!4v1758430067258!5m2!1sth!2sth" 
            width="800" 
            height="600" 
            style={{border:0}} 
            loading="lazy" 
            />
        </div>
    </div>
  );
}
