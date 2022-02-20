import React, { createRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button, Grid } from '@material-ui/core';
import { Stage, Layer, Image, Transformer, Text } from 'react-konva';
import useImage from 'use-image';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FontPicker from 'font-picker-react';


const styles = theme => ({
  content: {
  	 ...theme.mixins.gutters(),
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
     
  }
});

const URLImage = ({ image, shapeProps, isSelected, onSelect, onChange }) => {
    const [img] = useImage(image.src);
    const shapeRef = React.useRef();
    const trRef = React.useRef();
  
    React.useEffect(() => {
      if (isSelected) {
        //we need to attach transformer manually
        trRef.current.setNode(shapeRef.current);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected]);
  
    return (
      <React.Fragment>
        <Image
          image={img}
          x={image.x}
          y={image.y}
          // I will use offset to set origin to the center of the image
          // offsetX={img ? img.width / 2 : 0}
          // offsetY={img ? img.height / 2 : 0}
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...shapeProps}
          draggable
          onDragEnd={e => {
            onChange({
              ...shapeProps,
              x: e.target.x(),
              y: e.target.y()
            });
          }}
          onTransformEnd={e => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            onChange({
              ...shapeProps,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY)
            });
          }}
        />
        {isSelected && (
          <Transformer
            ref={trRef}
            rotationSnaps={[0,90,180,270]}
            rotation
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
                return newBox;
            }}
          />
        )}
      </React.Fragment>
    );
  };

const TextObject = ({ activeFontFamily, text, shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Text
        fontFamily={activeFontFamily}
        text={text}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.fontSize(node.fontSize() * node.scaleX());
          console.log(node.fontSize())

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          rotationSnaps={[0,90,180,270]}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

function Home(props, { display }) {
  const { classes } = props;

  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  const [image, setImage] = React.useState([]);
  const [selectedArray, setSelectedArray] = React.useState(null);
  const [selectedTextArray, setSelectedTextArray] = React.useState(null);
  const [selectedId, selectShape] = React.useState(null);
  const [selectedtextId, selectTextShape] = React.useState(null);
  const [text, setText] = React.useState('bois');
  const [activeFontFamily, setActiveFontFamily] = React.useState("Open Sans");
  const [texts, setTexts] = React.useState([]);
  const [imageObj, setImageObj] = useState([]);
  const [toggledFlip, setToggledFlip] = React.useState(true);
  const toggleImage = () => setToggledFlip(!toggledFlip);
  const [toggledColor, setToggledColor] = useState("");
  const price = useState(50000);


  console.log(texts)
  console.log(images)
  console.log(selectedId)
  console.log(imageObj)
  console.log (typeof price)

  const renderPhotos = (source) => {
    console.log("source: ", source);
    return source.map((photo, i) => {
      const imgId = image[i].id++;
      var imgs = document.createElement('img')
      imgs.onload = function(){
        console.log('width: '+imgs.width+'height: '+imgs.height)
      };
      imgs.src = source[i]
      console.log(source[i])
      return                             <img
      src={photo}
      key={i}
      style={{border: '1px solid black'}}
      alt="uploaded images"
      draggable="true"
      width="100px"
      height="100px"
      onDragStart={e => {
          dragUrl.current = e.target.src;
      }}
      onMouseDown={() => {
        console.log(image[i])
        addStickerToPanel({
          src: photo,
          // width: image.width,
          scaleX:1,
          scaleY:1,
          x: 100,
          y: 100,
          id: imgId,
          width: imgs.width >500 ? imgs.width / 5 : imgs.width,
          height: imgs.height > 500 ? imgs.height /5 : imgs.height
        });
      }}
      />;
    });
  };

  const addStickerToPanel = ({ src, width, x, y, height, id, scaleX, scaleY }) => {
    setImages((currentImages) => [
      ...currentImages,
      {
        width,
        height,
        scaleX,
        scaleY,
        x,
        y,
        src,
        id,
        resetButtonRef: createRef()
      }
    ]);
  };

  const addTextToCanvas = ({ value, x, y, id, scaleX, scaleY, fill }) => {
    setTexts((currentTexts) => [
      ...currentTexts,
      {
        x,
        y,
        scaleX, 
        scaleY,
        value,
        id,
        fill,
        resetButtonRef: createRef()
      }
    ]);
  };

  const handleChange = (e) => {
    e.preventDefault();
    for (let i = 0; i < e.target.files.length; i++) {
      const newFile = e.target.files[i];
      newFile["id"] = Math.random();
  // add an "id" property to each File object
      setImage(prevState => [...prevState, newFile]);
    }
    if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );

        console.log("filesArray: ", filesArray);
  
        setImageObj((prevImages) => prevImages.concat(filesArray));
        console.log(typeof filesArray)
        Array.from(e.target.files).map(
          (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
    }
  };

  // const { handleUndo, handleRedo, handleDragEnd, history} = UndoTest();
  function handleChangeText(e){
    e.preventDefault();
    setText(e.target.value);
  }

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    const clickedOnEmptyText = e.target === e.target.getStage();
    if (clickedOnEmpty || clickedOnEmptyText) {
      selectShape(null);
      selectTextShape(null);
    }
  };

  // const checkTextDeselect = e => {
  //   // deselect when clicked on empty area
  //   const clickedOnEmpty = e.target === e.target.getStage();
  //   if (clickedOnEmpty) {
  //     selectTextShape(null);
  //   }
  // };

  const [blackTees] = useImage('./assets/tees-color/black-tees.png');
  const [greenTees] = useImage('./assets/tees-color/green-tees.png');
  const [orangeTees] = useImage('./assets/tees-color/orange-tees.png');

  const flipImage = () => {
    if(selectedArray.scaleX == 1){
      setSelectedArray(selectedArray.scaleX = -1)
    }else{
      setSelectedArray(selectedArray.scaleX == 1)
    }
    console.log(selectedArray.scaleX)

  }

  const clearCanvas = () => {
    while(images.length > 0) {
      images.pop();
      setImages([]);
    }
  }

  const clearTextsCanvas = () => {
    while(texts.length > 0) {
      texts.pop();
      setTexts([]);
    }
  }

  const deleteImages = () => {
    {images.map((image, i) => {
      console.log(image.id)
      if(selectedId == image.id){
        console.log('sama bos')
        images.splice(i,1);
      }
    })}
  }
  return (
    <div className={classes.content}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h3">
            Welcome Home!
          </Typography>
        </Grid>
        <Grid item xs={6}>
        <div
            onDrop={e => {
            // register event position
            stageRef.current.setPointersPositions(e);
            // add image
            setImages(
                images.concat([
                {
                    ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current,
                }
                ])
            );
            }}
            onDragOver={e => e.preventDefault()}
        >
            {/* <BlackTees/> */}
            <Stage 
            height={350} 
            width={590}
            ref={stageRef}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{border:'dotted'}}
            // opacity={0}
            >
                <Layer> 
                {toggledColor === '' ? (
                <Image image={greenTees} width={390} height={322}/>
                ):null}
                {toggledColor === 1 ? (
                <Image image={blackTees} width={390} height={322}/>
                ):null}
                {toggledColor === 2 ? (
                <Image image={greenTees} width={390} height={322}/>
                ):null}
                {toggledColor === 3 ? (
                <Image image={orangeTees} width={390} height={322}/>
                ):null}
                {images.map((image, i) => {
                return (
                    <URLImage
                    image={image} 
                    key={i}
                    shapeProps={image}
                    isSelected={image.id === selectedId}
                    onSelect={() => {
                        selectShape(image.id);
                        setSelectedArray(image);
                        console.log(selectedArray);
                    }}
                    onChange={newAttrs => {
                        const imagur = images.slice();
                        imagur[i] = newAttrs;
                        setImages(imagur);
                    }}
                    />
                );
                })}
                {texts.map((textObj, i) => {
                return (
                  <TextObject
                    activeFontFamily={activeFontFamily}
                    text={text}
                    key={i}
                    shapeProps={textObj}
                    isSelected={textObj.id === selectedtextId}
                    onSelect={() => {
                      selectTextShape(textObj.id);
                      setSelectedTextArray(textObj);
                      console.log(selectedTextArray);
                    }}
                    onChange={(newAttrs) => {
                      const txts = texts.slice();
                      txts[i] = newAttrs;
                      setTexts(txts);
                    }}
                  />
                );
              })}
                {/* <Text fontFamily={activeFontFamily} text={display.text} draggable/> */}
                </Layer>
            </Stage>
        </div>
        </Grid>
        <Grid item xs={6}>
        <Tabs>
      <TabList>
        <Tab>Color</Tab>
        <Tab>Material</Tab>
        <Tab>Text</Tab>
        <Tab>Design</Tab>
        <Tab>Size and Quantity</Tab>
      </TabList>
  
        <TabPanel>
          <Grid container>
            <Grid item style={{border:'1px solid black'}}>
                <Grid style={{border:'1px solid black'}}>
                <Button onClick={() => setToggledColor(1)} color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/black.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button onClick={() => setToggledColor(3)} color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/red.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/yellow.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/purple.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
            </Grid>  
            <Grid style={{border:'1px solid black'}}>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/white.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button onClick={() => setToggledColor(2)} color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/green.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/tosca.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/pink.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
            </Grid>
            <Grid style={{border:'1px solid black'}}>
                <Grid style={{border:'1px solid black'}}>
                    <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/grey.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/lime.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/blue.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel>
            <button>30s</button>
            <button>gildan</button>
        </TabPanel>
        <TabPanel>
            <Button 
              color="primary"
              onMouseDown={(e) => {
                addTextToCanvas({
                  value: text,
                  scaleX: 1,
                  scaleY: 1,
                  id: e.target.id++,
                  x: 100,
                  y: Math.random() * 350,
                  fill: 'black'
                });
              }}
            >add text</Button><br/>
            <Button onClick={clearTextsCanvas}>CLEAR ALL TEXTS</Button><br/>
            {selectedtextId == null ? (
              null
            ):
            <input type="text" onChange={handleChangeText}/>}<br/><br/>
            {selectedtextId == null ? (
              null
            ):
            <FontPicker
              apiKey="AIzaSyA5JEM2O2zwONPE1hnhL-xb7pNeFGtmRH0"
              activeFontFamily={activeFontFamily}
              onChange={(nextFont) =>
                setActiveFontFamily(nextFont.family)
              }
            />}
            {selectedtextId == null ? (
              null
            ):
            <Button>DELETE</Button>}
            {selectedtextId == null ? (
              null
            ):
            <Button>FLIP</Button>}
        </TabPanel>
        <TabPanel>
        {/* <img
          alt="lion"
          src="http://tiny.cc/txxjsz"
          width="100px"
          height="100px"
          draggable="true"
          onDragStart={e => {
            dragUrl.current = e.target.src;
          }}
        /> */}
        {renderPhotos(imageObj)}<br/>
        <input type="file" multiple onChange={handleChange}/><br/>
        {selectedId == null ? (
              null
            ):
            <Button onClick={deleteImages}>DELETE</Button>}
            {selectedId == null ? (
              null
            ):
            <Button onClick={flipImage}>FLIP</Button>}
            <Button onClick={clearCanvas}>CLEAR</Button>
        </TabPanel>
        <TabPanel>
          <Grid> 
            <Grid>
              <form>
                <label className='label'>
                  Small:
                  <input type="number" name="name" style={{height:'25px', width: '25px', marginLeft:'54px'}}/>
                </label><br/><br/>
                <label className='label'>
                  Medium:
                  <input type="number" name="name" style={{height:'25px', width: '25px', marginLeft:'36px'}}/>
                </label><br/><br/>
                <label className='label'>
                  Large:
                  <input type="number" name="name" style={{height:'25px', width: '25px', marginLeft:'55px'}}/>
                </label><br/><br/>
                <label className='label'>
                  Extra Large:
                  <input type="number" name="name" style={{height:'25px', width: '25px', marginLeft:'15px'}}/>
                </label><br/><br/>
              </form>
            </Grid>
            <Grid>
              <img src='./assets/size-details.png' style={{marginRight:'395px'}}/>
            </Grid>
          </Grid>
        </TabPanel>
      </Tabs>
        </Grid>
        <Grid item xs={3}>
        <Typography variant="h5" component="h3">
          Welcome Home!
        </Typography>        
        </Grid>
        <Grid item xs={3}>
        <Typography variant="h5" component="h3">
          Welcome Home!
        </Typography>        
        </Grid>
        <Grid item xs={3}>
        <Typography variant="h5" component="h3">
          Welcome Home!
        </Typography>        
        </Grid>
        <Grid item xs={3}>
        {/* <Typography variant="h5" component="h3">
          Welcome Home!
        </Typography>         */}
        {/* {images.length > 0 ? ('Rp. ' + price + 40000) : 'Rp. ' + price} */}
        {images.length > 0 ? (
              (50000 + 40000)
            ):
            price}
        </Grid>
      </Grid>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);