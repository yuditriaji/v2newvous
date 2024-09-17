import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar, Toolbar, Typography, Container, Grid, Paper, Tabs, Tab, Button, IconButton, Box
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Stage, Layer, Image, Text, Transformer, Group, Rect } from 'react-konva';
import useImage from 'use-image';
import FontPicker from 'font-picker-react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import Header from '../Shared/Header';
import Footer from '../Shared/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  appBar: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: 'none',
    borderBottom: '1px solid #e0e0e0',
  },
  logo: {
    marginRight: theme.spacing(2),
    width: 40,
    height: 40,
  },
  navItems: {
    flexGrow: 1,
  },
  navButton: {
    textTransform: 'none',
    marginRight: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  canvas: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    border: '1px solid #e0e0e0',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  panel: {
    height: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },
  tabs: {
    borderBottom: '1px solid #e0e0e0',
  },
  tab: {
    minWidth: 'auto',
    padding: theme.spacing(1, 2),
  },
  tabContent: {
    padding: theme.spacing(2),
  },
  footer: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  nextButton: {
    padding: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  uploadButton: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `2px dotted ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  uploadIcon: {
    marginRight: theme.spacing(1),
  },
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
  },
  previewImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    margin: theme.spacing(0.5),
    cursor: 'pointer',
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: 'transparent',
    border: `2px dotted ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

function TShirtCustomizer() {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([]);
  const [selectedId, selectShape] = useState(null);
  const [selectedtextId, selectTextShape] = useState(null);
  const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
  const [toggledColor, setToggledColor] = useState("");
  const [text, setText] = useState("");
  const [imageObj, setImageObj] = useState([]);
  const stageRef = useRef(null);

  const handleChange = (event) => {
    const files = Array.from(event.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setImageObj(urls);
  };

  const addStickerToPanel = (src) => {
    const newImage = {
      x: 100,
      y: 100,
      src: src,
      id: Date.now().toString(),
    };
    setImages(prevImages => [...prevImages, newImage]);
  };

  const handleChangeText = (event) => {
    setText(event.target.value);
  };

  const addTextToCanvas = (textProps) => {
    console.log('Adding text:', textProps);
    setTexts(prevTexts => {
      const newTexts = [...prevTexts, { ...textProps, id: Date.now() }];
      console.log('New texts state:', newTexts);
      return newTexts;
    });
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      selectTextShape(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const clearImages = () => {
    setImages([]);
  };

  const clearTexts = () => {
    setTexts([]);
  };

  useEffect(() => {
    console.log('Images state updated:', images);
  }, [images]);

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src="./assets/logo-trpt.png" alt="Logo" className={classes.logo} />
          <Box className={classes.navItems}>
            <Button color="inherit" className={classes.navButton}>Home</Button>
            <Button color="inherit" className={classes.navButton}>Product</Button>
            <Button color="inherit" className={classes.navButton}>About Us</Button>
          </Box>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>       */}
      <Header />
      <Container className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.canvas}>
              <TShirtCanvas 
                images={images}
                texts={texts}
                selectedId={selectedId}
                selectedtextId={selectedtextId}
                activeFontFamily={activeFontFamily}
                toggledColor={toggledColor}
                stageRef={stageRef}
                selectShape={selectShape}
                selectTextShape={selectTextShape}
                checkDeselect={checkDeselect}
                setImages={setImages}
                setTexts={setTexts}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.panel}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                indicatorColor="primary" 
                textColor="primary"
                variant="fullWidth"
                className={classes.tabs}
              >
                <Tab label="Color" className={classes.tab} />
                <Tab label="Material" className={classes.tab} />
                <Tab label="Text" className={classes.tab} />
                <Tab label="Design" className={classes.tab} />
                <Tab label="Sizing" className={classes.tab} />
              </Tabs>
              <div className={classes.tabContent}>
                {tabValue === 0 && <ColorSelector setToggledColor={setToggledColor} />}
                {tabValue === 1 && <MaterialSelector />}
                {tabValue === 2 && (
                  <>
                    <TextAdder 
                      addTextToCanvas={addTextToCanvas} 
                      handleChangeText={handleChangeText} 
                      text={text} 
                      setActiveFontFamily={setActiveFontFamily} 
                      activeFontFamily={activeFontFamily} 
                    />
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={clearTexts}
                      style={{ marginTop: '10px' }}
                    >
                      Clear Texts
                    </Button>
                  </>
                )}
                {tabValue === 3 && (
                  <>
                    <DesignUploader 
                      handleChange={handleChange} 
                      imageObj={imageObj} 
                      addStickerToPanel={addStickerToPanel}
                    />
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      onClick={clearImages}
                      style={{ marginTop: '10px' }}
                    >
                      Clear Images
                    </Button>
                  </>
                )}
                {tabValue === 4 && <SizeSelector />}
              </div>
              <div className={classes.nextButton}>
                <Button variant="contained" color="primary" fullWidth>
                  Next
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

function TShirtCanvas({ images, texts, selectedId, selectedtextId, activeFontFamily, toggledColor, stageRef, selectShape, selectTextShape, checkDeselect, setImages, setTexts }) {
  const [image] = useImage('https://d3vvxc53hv5hl7.cloudfront.net/unisex_tees/product_template_hanes_tagless_tee_front.png');
  const [color, setColor] = useState('#ffffff'); // Default white

  // Define stage dimensions
  const stageWidth = 500; // Set this to your desired width
  const stageHeight = 600; // Set this to your desired height

  useEffect(() => {
    if (toggledColor !== "") {
      setColor(getColorFromIndex(toggledColor));
    }
  }, [toggledColor]);

  const getColorFromIndex = (index) => {
    const colors = ['#000000', '#4CAF50', '#2196F3', '#F44336', '#CDDC39', '#9C27B0', '#FFEB3B', '#009688', '#E91E63', '#FFFFFF', '#9E9E9E'];
    return colors[index] || '#ffffff';
  };

  return (
    <div style={{ position: 'relative', width: stageWidth, height: stageHeight }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: color,
          mixBlendMode: 'multiply',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(https://d3vvxc53hv5hl7.cloudfront.net/unisex_tees/product_template_hanes_tagless_tee_front.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          maskImage: `url(https://d3vvxc53hv5hl7.cloudfront.net/unisex_tees/product_template_hanes_tagless_tee_front.png)`,
          maskSize: 'cover',
          WebkitMaskImage: `url(https://d3vvxc53hv5hl7.cloudfront.net/unisex_tees/product_template_hanes_tagless_tee_front.png)`,
          WebkitMaskSize: 'cover',
          maskPosition: 'center bottom',
          WebkitMaskPosition: 'center bottom',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
      <Stage 
        width={stageWidth}
        height={stageHeight}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Layer>
          {images && images.map((image, i) => (
            <URLImage
              key={image.id}
              image={image}
              isSelected={image.id === selectedId}
              onSelect={() => selectShape(image.id)}
              onChange={(newAttrs) => {
                const imgs = images.slice();
                imgs[i] = newAttrs;
                setImages(imgs);
              }}
            />
          ))}
          
          {texts && texts.map((text, i) => (
            <TextObject
              key={text.id}
              shapeProps={text}
              isSelected={text.id === selectedtextId}
              onSelect={() => selectTextShape(text.id)}
              onChange={(newAttrs) => {
                const txts = texts.slice();
                txts[i] = newAttrs;
                setTexts(txts);
              }}
              activeFontFamily={activeFontFamily}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

const URLImage = ({ image, isSelected, onSelect, onChange }) => {
  const [img] = useImage(image.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Image
        image={img}
        x={image.x}
        y={image.y}
        width={100}
        height={100}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY, 5),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

const TextObject = ({ shapeProps, isSelected, onSelect, onChange, activeFontFamily }) => {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        fontFamily={activeFontFamily}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Reset scale to 1 to prevent compounding scaling
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(node.width() * scaleX, 5),
            height: Math.max(node.height() * scaleY, 5),
            fontSize: shapeProps.fontSize * scaleY, // Scale the font size
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
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

function ColorSelector({ setToggledColor }) {
  const classes = useStyles();
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Green', hex: '#4CAF50' },
    { name: 'Blue', hex: '#2196F3' },
    { name: 'Red', hex: '#F44336' },
    { name: 'Lime', hex: '#CDDC39' },
    { name: 'Purple', hex: '#9C27B0' },
    { name: 'Yellow', hex: '#FFEB3B' },
    { name: 'Tosca', hex: '#009688' },
    { name: 'Pink', hex: '#E91E63' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Grey', hex: '#9E9E9E' },
  ];

  return (
    <Grid container spacing={2}>
      {colors.map((color, index) => (
        <Grid item xs={3} key={index} style={{ textAlign: 'center' }}>
          <Button
            onClick={() => setToggledColor(index)}
            style={{
              backgroundColor: color.hex,
              width: 60,
              height: 60,
              minWidth: 'auto',
              borderRadius: '50%',
              border: color.name === 'White' ? '1px solid #e0e0e0' : 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              padding: 0,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: color.hex,
              }}
            >
              <img 
                src="./assets/color/ion_shirt-sharp.png"
                alt={`${color.name} shirt`}
                style={{ 
                  width: '60%',
                  height: '60%',
                  objectFit: 'contain',
                  filter: color.name === 'White' ? 'invert(1)' : 'none',
                }} 
              />
            </div>
          </Button>
          <Typography variant="caption" style={{ marginTop: 5, display: 'block' }}>
            {color.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

function MaterialSelector() {
  // Implement material selection UI
  return <div>Material Selector</div>;
}

function DesignUploader({ handleChange, imageObj, addStickerToPanel }) {
  const classes = useStyles();

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="outlined"
          component="span"
          className={classes.uploadButton}
          startIcon={<CloudUploadIcon className={classes.uploadIcon} />}
          fullWidth
        >
          Upload Image
        </Button>
      </label>
      {imageObj.length > 0 && (
        <Typography variant="subtitle1" gutterBottom>
          Click on an image to add it to your design:
        </Typography>
      )}
      <Grid container spacing={1} className={classes.previewContainer}>
        {imageObj.map((src, index) => (
          <Grid item key={index}>
            <img
              src={src}
              alt={`upload preview ${index}`}
              className={classes.previewImage}
              onClick={() => addStickerToPanel(src)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function TextAdder({ addTextToCanvas, handleChangeText, text, setActiveFontFamily, activeFontFamily }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        type="text"
        value={text}
        onChange={handleChangeText}
        placeholder="Enter text"
      />
      <Button
        fullWidth
        variant="outlined"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={() => addTextToCanvas({
          text: text,
          x: 100,
          y: 100,
          fontSize: 20,
          fill: 'black'
        })}
      >
        Add Text to Canvas
      </Button>
      <FontPicker
        apiKey="YOUR_GOOGLE_FONTS_API_KEY"
        activeFontFamily={activeFontFamily}
        onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
      />
    </div>
  );
}

function SizeSelector() {
  // Implement size selection UI
  return <div>Size Selector</div>;
}

export default TShirtCustomizer;