import React from "react";
import { expect } from "chai";
import { render } from "enzyme";
import Form from "./Form";

it("Puts the location in the textboxes and shows the correct direction", () => {
  const form = render(
    <Form
      pickupLocation={{ lat: -1, lng: 3 }}
      setLatitude={() => ""}
      setLongitude={() => ""}
      setDirection={() => ""}
      direction={"Kenya"}
    />
  );
  expect(form.find("#latitude").val()).to.equal("-1");
  expect(form.find("#longitude").val()).to.equal("3");
  expect(form.find("#direction").val()).to.equal("Kenya");
});
