import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { mainListItems } from "./listItems";
import { Stage, Layer, Text, Circle, Line, Rect, Group } from "react-konva";
import Container from "@material-ui/core/Container";

class MineralInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choosenCreatedMineral:
        this.props.value ||
        JSON.parse(localStorage.getItem("choosenCreatedMineral")),
      mineralImage: null,
      mineralGroupImage: null,
      mineralSystemImage: null,
      stageWidth: 1100,
      hoveredGravity: false,
      hoveredSystem: false,
      hoveredGroup: false,
      hoveredSubGroup: false,
      hoveredComponents: false
    };
  }
  componentDidMount() {
    this.checkSize();
    window.addEventListener("resize", this.checkSize);

    this.getImagesForInfoPage(this.state.choosenCreatedMineral);
    window.addEventListener("getimage", this.getImagesForInfoPage);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkSize);
    window.removeEventListener("getimage", this.getImagesForInfoPage);
  }

  checkSize = () => {
    if (this.container) {
      const width = this.container.offsetWidth;
      this.setState({
        stageWidth: width
      });
    }
  };

  getImagesForInfoPage(choosenMineral) {
    if (choosenMineral != null) {
      const imageMineral = new window.Image();
      const imageGroup = new window.Image();
      const imageSystem = new window.Image();
      imageMineral.onload = () => {
        this.setState({
          mineralImage: imageMineral
        });
      };
      imageGroup.onload = () => {
        this.setState({
          mineralGroupImage: imageGroup
        });
      };
      imageSystem.onload = () => {
        this.setState({
          mineralSystemImage: imageSystem
        });
      };
      imageMineral.src = require("./images/" +
        chooseMineralPic(this.state.choosenCreatedMineral.color[0]) +
        ".svg");
      imageGroup.src = require("./images/" +
        groupMineralPic(this.state.choosenCreatedMineral.mainGroup[0]) +
        ".svg");
      imageSystem.src = require("./images/" +
        this.chooseSystemPic(this.state.choosenCreatedMineral.system) +
        ".svg");
    }
  }

  renderGroupCircle() {
    return (
      <Layer
        onTap={() =>
          this.setState({
            hoveredGroup: true
          })
        }
        onMouseOver={() =>
          this.setState({
            hoveredGroup: true
          })
        }
      >
        <Circle
          className="group"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={100}
          fill={"#80deea"}
        />
        <Circle
          className="group"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={75}
          fill={"#ffffff"}
        />
        <Circle
          className="group"
          x={130 + window.innerWidth / 2 - 225}
          y={330}
          radius={75}
          fillPatternImage={this.state.mineralGroupImage}
          fillPatternRepeat={"no-repeat"}
          fillPatternScaleX={1}
          fillPatternScaleY={1}
          fillPatternOffsetY={80}
          fillPatternOffsetX={100}
        />
      </Layer>
    );
  }

  renderSystemCircle() {
    return (
      <Layer
        onTap={() =>
          this.setState({
            hoveredSystem: true
          })
        }
        onMouseOver={() =>
          this.setState({
            hoveredSystem: true
          })
        }
      >
        <Circle
          className="system"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={120}
          fill={"#80deea"}
        />
        <Circle
          className="system"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={90}
          fill={"#ffffff"}
        />
        <Circle
          className="system"
          x={380 + window.innerWidth / 2 - 225}
          y={340}
          radius={90}
          fillPatternImage={this.state.mineralSystemImage}
          fillPatternRepeat={"no-repeat"}
          fillPatternScaleX={1}
          fillPatternScaleY={1}
          fillPatternOffsetY={75}
          fillPatternOffsetX={100}
        />
      </Layer>
    );
  }

  chooseSystemPic(systemOfMineral) {
    switch (systemOfMineral.toLowerCase()) {
      case "triclinic":
        return "triclinic";
      case "monoclinic":
        return "monoclinic";
      case "orthorhombic":
        return "orthorhombic";
      case "hexagonal":
        return "hexagonal";
      case "tetragonal":
        return "tetragonal";
      case "trigonal":
        return "trigonal";
      case "isometric":
        return "isometric";
      default:
        return "isometric";
    }
  }

  getGroupData(mineralGroup) {
    if (mineralGroup != null) {
      if (mineralGroup === "Elements") {
        return this.state.choosenCreatedMineral.formula[0];
      } else {
        const data = require("./mineralGroups.json");
        return data.groups.elements[mineralGroup];
      }
    }
  }

  renderComponents(mainGroup) {
    const componentsList = this.getGroupData(mainGroup[0]);
    const darkColor = "#009faf";
    if (componentsList.length > 1) {
      return (
        <Layer
          onTap={() =>
            this.setState({
              hoveredComponents: true
            })
          }
          onMouseOver={() =>
            this.setState({
              hoveredComponents: true
            })
          }>
          <Rect
            x={125 - 60 + window.innerWidth / 2 - 225}
            y={90 - 15}
            width={40}
            height={40}
            fill={darkColor}
            stroke={"white"}
            dash={[0.2, 0.4]}
            cornerRadius={3}
          />
          <Rect
            x={125 - 60 + window.innerWidth / 2 - 175}
            y={90 - 15}
            width={40}
            height={40}
            fill={darkColor}
            stroke={"white"}
            dash={[0.2, 0.4]}
            cornerRadius={3}
          />
          <Text
            fontSize={18}
            text={this.getGroupData(mainGroup[0])[0]}
            wrap="char"
            x={125 - 60 + window.innerWidth / 2 - 265}
            y={90 - 52}
            fill={"white"}
            width={120}
            height={120}
            align={"center"}
            verticalAlign={"middle"}
          />
          <Text
            fontSize={18}
            text={this.getGroupData(mainGroup[0])[1]}
            wrap="char"
            x={125 - 60 + window.innerWidth / 2 - 215}
            y={90 - 52}
            fill={"white"}
            width={120}
            height={120}
            align={"center"}
            verticalAlign={"middle"}
          />
          <Text
            fontSize={15}
            text={"Components"}
            wrap="char"
            x={125 - 60 + window.innerWidth / 2 - 240}
            y={90 - 87}
            fill={"white"}
            width={120}
            height={120}
            align={"center"}
            verticalAlign={"middle"}
          />
        </Layer>
      );
    } else {
      return (
        <Layer>
          <Rect
            x={125 - 60 + window.innerWidth / 2 - 200}
            y={90 - 10}
            width={40}
            height={40}
            fill={darkColor}
            stroke={"white"}
            dash={[0.2, 0.4]}
            cornerRadius={3}
          />
          <Text
            fontSize={18}
            text={this.getGroupData(mainGroup[0])[0]}
            wrap="char"
            x={125 - 60 + window.innerWidth / 2 - 240}
            y={90 - 47}
            fill={"white"}
            width={120}
            height={120}
            align={"center"}
            verticalAlign={"middle"}
          />
          <Text
            fontSize={15}
            text={"Components"}
            wrap="char"
            x={125 - 60 + window.innerWidth / 2 - 240}
            y={90 - 87}
            fill={"white"}
            width={120}
            height={120}
            align={"center"}
            verticalAlign={"middle"}
          />
        </Layer>
      );
    }
  }
  render() {
    const darkColor = "#009faf";
    const lightColor = "#80deea";
    const appBarStyle = { zIndex: 1201, backgroundColor: "#009faf" };
    return (
      <div>
        <AppBar position="fixed" className="appBar" style={appBarStyle}>
          <Toolbar className="toolbar" style={{ paddingLeft: 0 }}>
            <IconButton
              color="inherit"
              aria-label="Menu"
              style={{ paddingLeft: -20 }}
            >
              <NavLink to="/">
                <i
                  className="material-icons"
                  style={{
                    color: "white",
                    fontSize: 30,
                    verticalAlign: "middle"
                  }}
                >
                  arrow_back_ios
 </i>
              </NavLink>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className="menu-header-text"
            >
              {this.state.choosenCreatedMineral === null
                ? "Crystallizer"
                : this.state.choosenCreatedMineral.name}
            </Typography>
            <div className="formula">Formula: </div>
            <div
              style={{ color: "white", fontSize: 15, paddingRight: 20 }}
              dangerouslySetInnerHTML={{
                __html: `${
                  this.state.choosenCreatedMineral === null
                    ? localStorage.getItem("choosenCreatedMineral")
                    : this.state.choosenCreatedMineral.formulaWeb
                  }`
              }}
            />
            <div className="icon">
              <img
                alt="icon"
                src="/crystallizer/favicon.ico"
                width={50}
                height={50}
              />
            </div>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" className="drawerPaper">
          <List style={{ marginTop: "61px" }}>{mainListItems}</List>
        </Drawer>
        <main className="content">
          <Container
            maxWidth="lg"
            className="container"
            style={{ paddingLeft: 20 }}
          >
            <div className="Periodic-table">
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              <link
                href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap"
                rel="stylesheet"
              />
              <div
                className="canvas-wrapper"
                ref={node => {
                  this.container = node;
                }}
              >
                <Stage width={this.state.stageWidth} height={600}>
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredComponents: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredComponents: true
                      })
                    }>
                    <Circle
                      className="groupElements"
                      x={125 + window.innerWidth / 2 - 240}
                      y={90}
                      radius={75}
                      fill={lightColor}
                    /*shadowColor={'grey'}
                    shadowBlur={10}*/
                    />
                    <Circle
                      className="groupElements"
                      x={125 + window.innerWidth / 2 - 240}
                      y={90}
                      radius={60}
                      fill={darkColor}
                    />
                  </Layer>
                  {this.renderComponents(
                    this.state.choosenCreatedMineral.mainGroup
                  )}
                  {this.renderSystemCircle()}
                  <Layer>
                    {this.state.hoveredComponents ? (
                      <Group>
                        <Line
                          className="groupComponentsInfo"
                          points={[
                            125 + window.innerWidth / 2 - 300,
                            70,
                            125 + window.innerWidth / 2 - 480,
                            70
                          ]}
                          stroke={lightColor}
                          strokeWidth={5}
                        />
                        <Circle
                          className="groupComponentsInfo"
                          x={125 + window.innerWidth / 2 - 240}
                          y={90}
                          radius={75}
                          fill={"transparent"}
                          stroke={"#00ffff"}
                          strokeWidth={2}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Rect
                          className="groupComponentsInfo"
                          x={125 + window.innerWidth / 2 - 480}
                          y={40}
                          width={140}
                          height={65}
                          fill={"white"}
                          stroke={lightColor}
                          cornerRadius={6}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Text
                          className="groupComponentsInfo"
                          fontSize={15}
                          fontStyle={{ color: "grey" }}
                          text={
                            `Members of the ${this.state.choosenCreatedMineral.mainGroup[0]} consist ${this.getGroupData(this.state.choosenCreatedMineral.mainGroup[0])} elements.`
                          }
                          wrap="word"
                          x={125 + window.innerWidth / 2 - 480}
                          y={50}
                          width={190}
                          height={50}
                          align={"center"}
                          verticalAlign={"middle"}
                        />
                      </Group>
                    ) : null}
                  </Layer>
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredGravity: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredGravity: true
                      })
                    }
                  >
                    <Circle
                      x={380 + window.innerWidth / 2 - 215}
                      y={90}
                      radius={80}
                      fill={lightColor}
                    />
                    <Text
                      fontSize={18}
                      text={`Specific Gravity\n${
                        this.state.choosenCreatedMineral.specificGravity
                        }`}
                      wrap="char"
                      x={380 - 80 + window.innerWidth / 2 - 215}
                      y={90 - 80}
                      fill={"white"}
                      width={160}
                      height={160}
                      align={"center"}
                      verticalAlign={"middle"}
                    />
                  </Layer>
                  <Layer>
                    {this.state.hoveredGravity ? (
                      <Group>
                        <Line
                          className="gravityInfo"
                          points={[
                            380 + window.innerWidth / 2 - 150,
                            90,
                            380 + window.innerWidth / 2 - 100,
                            90
                          ]}
                          stroke={lightColor}
                          strokeWidth={5}
                        />
                        <Circle
                          x={380 + window.innerWidth / 2 - 215}
                          y={90}
                          radius={80}
                          fill={"transparent"}
                          stroke={"#00ffff"}
                          strokeWidth={2}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Rect
                          className="gravityInfo"
                          x={380 + window.innerWidth / 2 - 100}
                          y={10}
                          width={120}
                          height={150}
                          fill={"white"}
                          stroke={lightColor}
                          cornerRadius={6}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Text
                          className="gravityInfo"
                          fontSize={15}
                          fontStyle={{ color: "grey" }}
                          text={
                            "Specific Gravity is a measurement that determines the density of minerals. It determines how heavy it is by its relative weight to water. "
                          }
                          wrap="word"
                          x={380 + window.innerWidth / 2 - 90}
                          y={25}
                          width={130}
                          height={125}
                          align={"center"}
                          verticalAlign={"middle"}
                        />
                      </Group>
                    ) : null}
                  </Layer>
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredGroup: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredGroup: true
                      })
                    }
                  >
                    <Circle
                      x={70 + window.innerWidth / 2 - 225}
                      y={210}
                      radius={65}
                      fill={lightColor}
                    />
                    <Text
                      fontSize={18}
                      text={
                        this.state.choosenCreatedMineral.mainGroup[0] +
                        "\ngroup"
                      }
                      wrap="char"
                      x={70 - 65 + window.innerWidth / 2 - 225}
                      y={210 - 65}
                      fill={"white"}
                      width={130}
                      height={130}
                      align={"center"}
                      verticalAlign={"middle"}
                    />
                    <Line
                      className="system"
                      points={[
                        380 + window.innerWidth / 2 - 225,
                        340,
                        380 + window.innerWidth / 2 - 225,
                        340 + 150
                      ]}
                      stroke={lightColor}
                      strokeWidth={6}
                    />
                    <Circle
                      className="smallSystem"
                      x={380 + window.innerWidth / 2 - 225}
                      y={340 + 150}
                      radius={10}
                      fill={lightColor}
                    />
                    <Circle
                      className="smallSystem"
                      x={380 + window.innerWidth / 2 - 225}
                      y={340 + 150}
                      radius={5}
                      fill={darkColor}
                    />
                    <Text
                      fontSize={18}
                      text={
                        this.state.choosenCreatedMineral.system +
                        "\ncrystal structure"
                      }
                      wrap="char"
                      x={380 + window.innerWidth / 2 - 225 - 75}
                      y={340 + 150 + 15}
                      fill={"black"}
                      width={150}
                      height={40}
                      align={"center"}
                      verticalAlign={"middle"}
                    />
                  </Layer>
                  {this.renderSystemCircle()}
                  <Layer>
                    {this.state.hoveredSystem ? (
                      <Group>
                        <Line
                          className="systemInfo"
                          points={[
                            380 + window.innerWidth / 2 - 110,
                            350,
                            380 + window.innerWidth / 2 - 80,
                            350
                          ]}
                          stroke={lightColor}
                          strokeWidth={5}
                        />
                        <Circle
                          className="systemInfo"
                          x={380 + window.innerWidth / 2 - 225}
                          y={340}
                          radius={120}
                          fill={"transparent"}
                          stroke={"#00ffff"}
                          strokeWidth={2}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Rect
                          className="systemInfo"
                          x={380 + window.innerWidth / 2 - 80}
                          y={290}
                          width={110}
                          height={150}
                          fill={"white"}
                          stroke={lightColor}
                          cornerRadius={6}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Text
                          className="systemInfo"
                          fontSize={15}
                          fontStyle={{ color: "grey" }}
                          text={
                            "There are six crystal systems. Although you may have seen more than six shapes of crystals, they’re all variations of one of these six habits. "
                          }
                          wrap="word"
                          x={380 + window.innerWidth / 2 - 75}
                          y={300}
                          width={130}
                          height={130}
                          align={"center"}
                          verticalAlign={"middle"}
                        />
                      </Group>
                    ) : null}
                  </Layer>
                  <Layer
                    onTap={() =>
                      this.setState({
                        hoveredSubGroup: true
                      })
                    }
                    onMouseOver={() =>
                      this.setState({
                        hoveredSubGroup: true
                      })
                    }
                  >
                    <Circle
                      x={180 + window.innerWidth / 2 - 225}
                      y={470}
                      radius={80}
                      fill={lightColor}
                    />
                    <Circle
                      x={180 + window.innerWidth / 2 - 225}
                      y={470}
                      radius={70}
                      fill={darkColor}
                    />
                    <Text
                      fontSize={18}
                      text={
                        this.state.choosenCreatedMineral.subGroup[0] +
                        "\nsubgroup"
                      }
                      wrap="char"
                      x={180 - 70 + window.innerWidth / 2 - 225}
                      y={480 - 70}
                      fill={"white"}
                      width={140}
                      height={140}
                      align={"center"}
                      verticalAlign={"middle"}
                    />
                  </Layer>
                  <Layer>
                    {this.state.hoveredSubGroup ? (
                      <Group>
                        <Line
                          className="subGroupInfo"
                          points={[
                            180 + window.innerWidth / 2 - 300,
                            500,
                            180 + window.innerWidth / 2 - 350,
                            500
                          ]}
                          stroke={lightColor}
                          strokeWidth={5}
                        />
                        <Circle
                          className="subGroupInfo"
                          x={180 + window.innerWidth / 2 - 225}
                          y={470}
                          radius={80}
                          fill={"transparent"}
                          stroke={"#00ffff"}
                          strokeWidth={2}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Rect
                          className="subGroupInfo"
                          x={180 + window.innerWidth / 2 - 480}
                          y={470}
                          width={150}
                          height={80}
                          fill={"white"}
                          stroke={lightColor}
                          cornerRadius={6}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Text
                          className="subGroupInfo"
                          fontSize={15}
                          fontStyle={{ color: "grey" }}
                          text={
                            "The next level of mineral classification after categorization in groups."
                          }
                          wrap="word"
                          x={180 + window.innerWidth / 2 - 480}
                          y={470}
                          width={200}
                          height={70}
                          align={"center"}
                          verticalAlign={"middle"}
                        />
                      </Group>
                    ) : null}
                  </Layer>
                  <Layer>
                    {this.state.hoveredGroup ? (
                      <Circle
                        className="groupInfo"
                        x={70 + window.innerWidth / 2 - 225}
                        y={210}
                        radius={65}
                        fill={"transparent"}
                        stroke={"#00ffff"}
                        strokeWidth={2}
                        shadowColor={"#00ffff"}
                        shadowBlur={10}
                      />
                    ) : null}
                  </Layer>
                  {this.renderGroupCircle()}
                  <Layer>
                    {this.state.hoveredGroup ? (
                      <Group>
                        <Line
                          className="groupInfo"
                          points={[
                            130 + window.innerWidth / 2 - 320,
                            350,
                            130 + window.innerWidth / 2 - 350,
                            350
                          ]}
                          stroke={lightColor}
                          strokeWidth={5}
                        />
                        <Circle
                          className="groupInfo"
                          x={130 + window.innerWidth / 2 - 225}
                          y={330}
                          radius={100}
                          fill={"transparent"}
                          stroke={"#00ffff"}
                          strokeWidth={2}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Rect
                          className="groupInfo"
                          x={130 + window.innerWidth / 2 - 470}
                          y={300}
                          width={120}
                          height={150}
                          fill={"white"}
                          stroke={lightColor}
                          cornerRadius={6}
                          shadowColor={"#00ffff"}
                          shadowBlur={10}
                        />
                        <Text
                          className="groupInfo"
                          fontSize={15}
                          fontStyle={{ color: "grey" }}
                          text={
                            "A mineral group is a set of mineral species with essentially the same crystal structure and composed of chemically similar elements. "
                          }
                          wrap="word"
                          x={130 + window.innerWidth / 2 - 460}
                          y={310}
                          width={140}
                          height={125}
                          align={"center"}
                          verticalAlign={"middle"}
                        />
                      </Group>
                    ) : null}
                  </Layer>
                  <Layer>
                    <Line
                      className="hardness"
                      points={[
                        250 + window.innerWidth / 2 - 225,
                        190,
                        250 + 140 + window.innerWidth / 2 - 225,
                        190
                      ]}
                      stroke={lightColor}
                      strokeWidth={5}
                    />
                    <Circle
                      className="smallHardness"
                      x={250 + 140 + window.innerWidth / 2 - 225}
                      y={190}
                      radius={10}
                      fill={lightColor}
                    />
                    <Circle
                      className="smallHardness"
                      x={250 + 140 + window.innerWidth / 2 - 225}
                      y={190}
                      radius={5}
                      fill={darkColor}
                    />
                    <Text
                      fontSize={18}
                      text={
                        "Hardness\n" + this.state.choosenCreatedMineral.hardness
                      }
                      wrap="char"
                      x={250 + 140 + window.innerWidth / 2 - 225 + 10}
                      y={180}
                      fill={"black"}
                      width={110}
                      height={40}
                      align={"center"}
                      verticalAlign={"middle"}
                    />
                    <Line
                      className="color"
                      points={[
                        250 + window.innerWidth / 2 - 225,
                        180,
                        250 + window.innerWidth / 2 - 225,
                        40
                      ]}
                      stroke={lightColor}
                      strokeWidth={5}
                    />
                    <Circle
                      className="smallColor"
                      x={250 + window.innerWidth / 2 - 225}
                      y={40}
                      radius={10}
                      fill={lightColor}
                    />
                    <Circle
                      className="smallColor"
                      x={250 + window.innerWidth / 2 - 225}
                      y={40}
                      radius={5}
                      fill={darkColor}
                    />
                    <Text
                      fontSize={18}
                      text={this.state.choosenCreatedMineral.color[0]}
                      wrap="char"
                      x={250 + window.innerWidth / 2 - 225 - 55}
                      y={10}
                      fill={"black"}
                      width={100}
                      height={15}
                      align={"center"}
                      verticalAlign={"middle"}
                    />
                    <Circle
                      x={250 + window.innerWidth / 2 - 225}
                      y={180}
                      radius={110}
                      fill={lightColor}
                    />
                    <Circle
                      x={250 + window.innerWidth / 2 - 225}
                      y={180}
                      radius={100}
                      fill={"#ffffff"}
                    />
                    <Circle
                      x={250 + window.innerWidth / 2 - 225}
                      y={180}
                      radius={100}
                      fillPatternImage={this.state.mineralImage}
                      fillPatternRepeat={"no-repeat"}
                      fillPatternScaleX={1}
                      fillPatternScaleY={1}
                      fillPatternOffsetY={80}
                      fillPatternOffsetX={100}
                    />
                  </Layer>
                </Stage>
              </div>
            </div>
          </Container>
        </main>
      </div>
    );
  }
}

export function chooseMineralPic(colorOfMineral) {
  switch (colorOfMineral.toLowerCase()) {
    case "yellow":
      return "yellow";
    case "orange":
      return "orange";
    case "black":
      return "black";
    case "blue":
      return "blue";
    case "bluish-green":
      return "bluish-green";
    case "brown":
      return "brown";
    case "cream":
      return "cream";
    case "green":
      return "green";
    case "greenish-blue":
      return "greenish-blue";
    case "grey":
      return "grey";
    case "pale-brown":
      return "pale-brown";
    case "pink":
      return "pink";
    case "purple":
      return "purple";
    case "red-brown":
      return "red-brown";
    case "red":
      return "red";
    case "violet":
      return "violet";
    case "yellow-orange":
      return "yellow-orange";
    case "gray":
      return "grey";
    default:
      return "yellow";
  }
}

export function groupMineralPic(groupOfMineral) {
  switch (groupOfMineral.toLowerCase()) {
    case "sulfides":
      return "sulfides";
    case "silicates":
      return "silicates";
    case "halides" /*F, Cl, Br, I, At elements pics*/:
      return "silicates";
    case "elements" /*first or first two elements pic*/:
      return "silicates";
    case "oxides":
      return "oxides";
    case "carbonates":
      return "carbonates";
    case "nitrates":
      return "nitrates";
    case "borates":
      return "borates";
    case "sulfates":
      return "sulfates";
    case "phosphates":
      return "phosphates";
    case "arsenates":
      return "arsenates";
    case "vanadates":
      return "vanadates";
    case "organic" /*carbon element*/:
      return "silicates";
    default:
      return "silicates";
  }
}

export default MineralInfoPage;