import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const Reciters = ({ setId, setCurrentreciter }) => {
  const Reciter = ({ ImageOfReciter, id, name }) => {
    return (
      <li
        className="cursor-pointer mr-1"
        title={name}
        id={id}
        onClick={(e) => {
          setId(id);
          setCurrentreciter(e.target.getAttribute("src"));
        }}
      >
        <img
          src={ImageOfReciter}
          alt=""
          className="w-12 h-12 object-cover rounded-full "
        />
      </li>
    );
  };
  return (
    <div className="pt-5">
      <Splide>
        <SplideSlide>
          <ul className="flex justify-evenly mb-10">
            <Reciter
              ImageOfReciter={
                "https://www.sqorebda3.com/vb/Photo/new_1421857851_932.jpg"
              }
              id={133}
              name={"Maher Al Mueaqly"}
            />
            <Reciter
              ImageOfReciter={
                "https://i1.sndcdn.com/artworks-000051458372-tqvzus-t500x500.jpg"
              }
              id={51}
              name={"Abdel Basit Abdel Samad"}
            />
            <Reciter
              ImageOfReciter={
                "https://i0.wp.com/boldnews.net/wp-content/uploads/2021/07/3-43.jpg"
              }
              id={119}
              name={"Mahmoud Khalil Al-Hussary"}
            />
            <Reciter
              ImageOfReciter={
                "https://i1.sndcdn.com/artworks-000384157938-anedpb-t500x500.jpg"
              }
              id={5}
              name={"Ahmed bin Ali Al-Ajmi"}
            />
            <Reciter
              ImageOfReciter={
                "https://pbs.twimg.com/profile_images/1392524806306869248/ulcRcBJT_400x400.jpg"
              }
              id={123}
              name={"Mishari bin Rashed Alafasy"}
            />
          </ul>
        </SplideSlide>
        <SplideSlide>
          <ul className="flex justify-evenly">
            <Reciter
              ImageOfReciter={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Mustafa_Ismail.jpg/280px-Mustafa_Ismail.jpg"
              }
              id={125}
              name={"Mustafa Ismail"}
            />
            <Reciter
              ImageOfReciter={
                "https://static.suratmp3.com/pics/reciters/thumbs/27_160_160.jpg"
              }
              id={113}
              name={"Muhammad Siddiq Al-Minshawi"}
            />
            <Reciter
              ImageOfReciter={
                "https://www.shorouknews.com/uploadedimages/Other/original/bannamahmoudd.jpg"
              }
              id={122}
              name={"Mahmoud Ali Albanna"}
            />
            <Reciter
              ImageOfReciter={
                "https://www.alayyam.info/Uploads/Content/2005/87GHHOU9-2IYF5B-2510/6.jpg"
              }
              id={74}
              name={"Ali Bin Abdur Rahman Al Huthaify"}
            />
            <Reciter
              ImageOfReciter={
                "https://s3-eu-west-1.amazonaws.com/content.argaamnews.com/ea7cb4c5-7191-43e0-bbd6-531665dabe2f.jpg"
              }
              id={54}
              name={"Abdul Rahman Al-Sudais"}
            />
          </ul>
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default Reciters;
