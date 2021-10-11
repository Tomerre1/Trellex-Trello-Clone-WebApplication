import {useState} from 'react'

export function BoardAddPalette({ setBgClr, setBgImg, bgClr, bgImg }) {

    const [selected,setSelected] = useState("linear-gradient(to bottom, #000000, #434343")
    
    const clrs = [
        "linear-gradient(to bottom, #000000, #434343)",
        "linear-gradient(to right, #2980b9, #2c3e50)",
        "linear-gradient(to right, #3494e6, #ec6ead)",
        "linear-gradient(to left, #2f7336, #aa3a38)",
        "linear-gradient(to top, #0052d4, #4364f7, #6fb1fc)",
        "linear-gradient(to bottom, #e52d27, #b31217)",
    ];

    const imgs = [
    "https://www.incimages.com/uploaded_files/image/1920x1080/getty_509107562_2000133320009280346_351827.jpg",
    "http://all4desktop.com/data_images/original/4238112-background.jpg",
    "https://c.pxhere.com/photos/4f/ee/candy_toppings_sweet_colorful_sugar-883692.jpg!d",
    "http://www.pngmagic.com/product_images/creative-banner-design-background-images.jpg",
    "https://cdn.wallpapersafari.com/22/29/fdqrYk.jpg",
    "https://img2.goodfon.com/wallpaper/nbig/2/73/texture-lines-colours-cveta.jpg"
    
];

  return (
    <div className="palettes">
      <div className="clrs">
        {clrs.map((color) => {
          return (
            <label
              key={color}
              className="flex align-center justify-center palette-icon"
              style={{ background: color , border: selected === color ? '2px solid white' : ''}}
              name="label-color"
              htmlFor={`color-${color}`}
            >
              <input
                type="radio"
                name="color"
                id={`color-${color}`}
                value={color}
                onClick={(ev) =>{ 
                    setBgClr(ev.target.value)
                    setBgImg('')
                    setSelected(ev.target.value)

                }}
              />
           
            </label>
          );
        })}
        <div className="imgs">
          {imgs.map((imgUrl) => {
            return (
              <label
                key={imgUrl}
                className="flex align-center justify-center palette-icon"
                style={{
                  background: `url(${imgUrl})`,
                  backgroundSize: "cover",
                  border: selected === imgUrl ? '2px solid white' : ''
                }}
                name="label-color"
                htmlFor={`color-${imgUrl}`}
              >
                <input
                  type="radio"
                  name="color"
                  id={`color-${imgUrl}`}
                  value={imgUrl}
                  onClick={(ev) =>{ 
                      setBgImg(ev.target.value)
                      setSelected(ev.target.value)
                }}
                />
          
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
