import React from "react";
import { Component } from "./Component";
import { ComponentWrapper } from "./ComponentWrapper";
import "../../index2.css";

export const Desktop = () => {
  return (
    <div className="desktop">
      <div className="div-2">
        <div className="overlap">
          <div className="component-2">
            <div className="overlap-group">
              <div className="rectangle" />
              <div className="rectangle-2" />
              <img className="element" alt="Element" src="4-1.png" />
            </div>
            <div className="overlap-group-2">
              <div className="rectangle-3" />
              <div className="rectangle-4" />
              <div className="text-wrapper-4">Next</div>
              <div className="text-wrapper-5">Prev</div>
            </div>
            <div className="text-wrapper-6">Color</div>
            <div className="text-wrapper-7">Material</div>
            <div className="text-wrapper-8">Text</div>
            <div className="text-wrapper-9">Design</div>
            <div className="text-wrapper-10">Size and Quantity</div>
          </div>
          <Component className="component-1" ionShirtSharp="ion-shirt-sharp-2.svg" />
          <Component
            className="component-1-instance"
            groupClassName="component-instance"
            ionShirtSharp="ion-shirt-sharp-3.svg"
            text="Red"
          />
          <Component
            className="design-component-instance-node"
            groupClassName="component-3"
            ionShirtSharp="ion-shirt-sharp-4.svg"
            text="Yellow"
          />
          <Component
            className="component-4"
            groupClassName="component-5"
            ionShirtSharp="ion-shirt-sharp-11.svg"
            text="White"
          />
          <Component
            className="component-6"
            groupClassName="component-7"
            ionShirtSharp="ion-shirt-sharp-5.svg"
            text="Green"
          />
          <Component
            className="component-8"
            groupClassName="component-9"
            ionShirtSharp="ion-shirt-sharp-6.svg"
            text="Lime"
          />
          <Component
            className="component-10"
            groupClassName="component-11"
            ionShirtSharp="ion-shirt-sharp-7.svg"
            text="Tosca"
          />
          <Component
            className="component-12"
            groupClassName="component-13"
            ionShirtSharp="ion-shirt-sharp-12.svg"
            text="Grey"
          />
          <Component
            className="component-14"
            groupClassName="component-15"
            ionShirtSharp="ion-shirt-sharp-8.svg"
            text="Blue"
          />
          <Component
            className="component-16"
            groupClassName="component-17"
            ionShirtSharp="ion-shirt-sharp-9.svg"
            text="Purple"
          />
          <Component
            className="component-18"
            groupClassName="component-19"
            ionShirtSharp="ion-shirt-sharp-10.svg"
            text="Pink"
          />
        </div>
        <ComponentWrapper className="component-13-instance" divClassName="component-20" heartIcon="image.svg" />
      </div>
    </div>
  );
};