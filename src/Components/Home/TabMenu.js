import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';
import 'react-tabs/style/react-tabs.css';
import FontPicker from 'font-picker-react';

const TabComponent = () => {
  
    return(
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
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/black.png' style={{height: '50px', width: '135px'}}/></Button>
                </Grid>
                <Grid style={{border:'1px solid black'}}>
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/red.png' style={{height: '50px', width: '135px'}}/></Button>
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
                <Button color="clear" style={{height: '50px', width: '135px'}}><img src='./assets/color/green.png' style={{height: '50px', width: '135px'}}/></Button>
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
          
        </TabPanel>
        <TabPanel>
  
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
    )
  }

export default function VerticalTabs() {
  
  return (
  <div>
    <div>
      <TabComponent/>
    </div>
  </div>
  );
}