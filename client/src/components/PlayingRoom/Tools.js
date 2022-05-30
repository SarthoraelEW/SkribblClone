import React from "react";

const PEN_SRC = "./assets/images/pen.gif";
const RUBBER_SRC = "./assets/images/rubber.gif";
const FILL_TOOL_SRC = "./assets/images/filltool.gif";

const WHITE = "White";
const LIGHT_GRAY = "LightGray";
const RED = "Red";
const CORAL = "Coral";
const YELLOW = "Yellow";
const LIME_GREEN = "LimeGreen";
const DEEP_SKY_BLUE = "DeepSkyBlue";
const BLUE = "Blue";
const DARK_VIOLET = "DarkViolet";
const LIGHT_PINK = "LightPink";
const SIENNA = "Sienna";
const BLACK = "Black";
const DARK_SLATE_GREY = "DarkSlateGrey";
const DARK_RED = "DarkRed";
const FIRE_BRICK = "FireBrick";
const ORANGE = "Orange";
const DARK_GREEN = "DarkGreen";
const ROYAL_BLUE = "RoyalBlue";
const DARK_BLUE = "DarkBlue";
const DARK_MAGENTA = "DarkMagenta";
const PALE_VIOLET_RED = "PaleVioletRed";
const SADDLE_BROWN = "SaddleBrown";

const SIZE1 = 6;
const SIZE2 = 16;
const SIZE3 = 30;
const SIZE4 = 44;

const Tools = (props) => {
  return (
    <div className="tools">
      <div className="colorPreview" style={{ backgroundColor: props.color }} />
      <div className="colorSelectorTable">
        <div className="colorSelectorRaw">
          <div
            className="colorSelector"
            style={{ backgroundColor: WHITE }}
            onClick={() => props.setColor(WHITE)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: LIGHT_GRAY }}
            onClick={() => props.setColor(LIGHT_GRAY)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: RED }}
            onClick={() => props.setColor(RED)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: CORAL }}
            onClick={() => props.setColor(CORAL)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: YELLOW }}
            onClick={() => props.setColor(YELLOW)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: LIME_GREEN }}
            onClick={() => props.setColor(LIME_GREEN)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DEEP_SKY_BLUE }}
            onClick={() => props.setColor(DEEP_SKY_BLUE)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: BLUE }}
            onClick={() => props.setColor(BLUE)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DARK_VIOLET }}
            onClick={() => props.setColor(DARK_VIOLET)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: LIGHT_PINK }}
            onClick={() => props.setColor(LIGHT_PINK)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: SIENNA }}
            onClick={() => props.setColor(SIENNA)}
          />
        </div>
        <div className="colorSelectorRaw">
          <div
            className="colorSelector"
            style={{ backgroundColor: BLACK }}
            onClick={() => props.setColor(BLACK)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DARK_SLATE_GREY }}
            onClick={() => props.setColor(DARK_SLATE_GREY)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DARK_RED }}
            onClick={() => props.setColor(DARK_RED)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: FIRE_BRICK }}
            onClick={() => props.setColor(FIRE_BRICK)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: ORANGE }}
            onClick={() => props.setColor(ORANGE)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DARK_GREEN }}
            onClick={() => props.setColor(DARK_GREEN)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: ROYAL_BLUE }}
            onClick={() => props.setColor(ROYAL_BLUE)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DARK_BLUE }}
            onClick={() => props.setColor(DARK_BLUE)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: DARK_MAGENTA }}
            onClick={() => props.setColor(DARK_MAGENTA)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: PALE_VIOLET_RED }}
            onClick={() => props.setColor(PALE_VIOLET_RED)}
          />
          <div
            className="colorSelector"
            style={{ backgroundColor: SADDLE_BROWN }}
            onClick={() => props.setColor(SADDLE_BROWN)}
          />
        </div>
      </div>
      <div className="drawingTools">
        <div
          className={
            "toolContainer" + (props.tool === "PEN" ? " toolActive" : "")
          }
          onClick={() => {
            props.setTool("PEN");
            props.setCursorUrl("PEN");
          }}
        >
          <img
            className="toolIcon"
            src={PEN_SRC}
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="(B)rush"
            alt="brush"
          />
        </div>
        <div
          className={
            "toolContainer" + (props.tool === "ERASER" ? " toolActive" : "")
          }
          onClick={() => {
            props.setTool("ERASER");
            props.setCursorUrl("ERASER");
          }}
        >
          <img
            className="toolIcon"
            src={RUBBER_SRC}
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="(E)raser"
            alt="eraser"
          />
        </div>
        <div
          className={
            "toolContainer" + (props.tool === "BUCKET" ? " toolActive" : "")
          }
          onClick={() => {
            props.setTool("BUCKET");
            props.setCursorUrl("BUCKET");
          }
          }
        >
          <img
            className="toolIcon"
            src={FILL_TOOL_SRC}
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="(F)ill"
            alt="fill"
          />
        </div>
      </div>
      <div className="lineWidths">
        <div className="lineWidth" onClick={() => {
          props.setLineWidth(SIZE1);
          props.setCursorUrl(props.tool, SIZE1);
        }}>
          <div className="sizeCenter" id="cursor6">
            <div className="size size6" />
          </div>
        </div>
        <div className="lineWidth" onClick={() => {
          props.setLineWidth(SIZE2);
          props.setCursorUrl(props.tool, SIZE2);
        }}>
          <div className="sizeCenter" id="cursor16">
            <div className="size size16" />
          </div>
        </div>
        <div className="lineWidth" onClick={() => {
          props.setLineWidth(SIZE3);
          props.setCursorUrl(props.tool, SIZE3)
        }}>
          <div className="sizeCenter" id="cursor30">
            <div className="size size30" />
          </div>
        </div>
        <div className="lineWidth" onClick={() => {
          props.setLineWidth(SIZE4);
          props.setCursorUrl(props.tool, SIZE4)
        }}>
          <div className="sizeCenter" id="cursor44">
            <div className="size size44" />
          </div>
        </div>
      </div>
      <div className="clearContainer" onClick={props.clear}>
        <div className="buttonClear" />
      </div>
    </div>
  );
};

export default Tools;
