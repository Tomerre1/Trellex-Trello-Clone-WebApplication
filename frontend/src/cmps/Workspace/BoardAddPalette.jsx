import CheckIcon from "@material-ui/icons/Check";

export function BoardAddPalette({ setBgClr, setBgImg, bgClr, bgImg }) {
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
 
  ];
  return (
    <div className="palettes">
      <div className="clrs">
        {clrs.map((color) => {
          return (
            <label
              key={color}
              className="flex align-center justify-center"
              style={{ background: color }}
              name="label-color"
              htmlFor={`color-${color}`}
            >
              <input
                type="radio"
                name="color"
                id={`color-${color}`}
                value={color}
                onClick={(ev) => setBgClr(ev.target.value)}
              />
              {bgImg && (
                <CheckIcon
                  key={color}
                  style={{ width: "16px", height: "16px", color: "white" }}
                />
              )}
            </label>
          );
        })}
        <div className="imgs">
          {imgs.map((color) => {
            return (
              <label
                key={color}
                className="flex align-center justify-center"
                style={{ background: `url(${color})`,backgroundSize:'cover' }}
                name="label-color"
                htmlFor={`color-${color}`}
              >
                <input
                  type="radio"
                  name="color"
                  id={`color-${color}`}
                  value={color}
                  onClick={(ev) => setBgClr(ev.target.value)}
                />
                {bgClr && (
                  <CheckIcon
                    key={color}
                    style={{ width: "16px", height: "16px", color: "white" }}
                  />
                )}
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
