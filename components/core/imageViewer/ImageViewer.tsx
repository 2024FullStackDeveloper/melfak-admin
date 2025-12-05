"use client";
import React from "react";
import Content from "../template/content/Content";
import Row from "../template/row/Row";
import Col from "../template/col/Col";
import Text from "../text/Text";
import Lightbox from "../lightBox/LightBox";

type Props = {
  src: string;
  alt: string;
  className: string;
  imageInModalClassName?: string;
};

const ImageViewer = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleImageError = () => setImageError(true);

  return (
    <Content>
      {!imageError ? (
        <img
          src={props.src}
          alt={props.alt}
          className={props.className + " cursor-pointer"}
          onClick={handleOpen}
          onError={handleImageError}
        />
      ) : (
        <Row className="w-full h-full items-center justify-center">
          <Col
            alignHorizontal="center"
            alignVertical="center"
            className="bg-gray-100 rounded-lg w-20 h-20"
          >
            <Text type="bodyXSmallRegular" className="text-gray-400">
              لا يوجد صورة
            </Text>
          </Col>
        </Row>
      )}
      <Lightbox
        images={[{ src: props.src, alt: props.alt }]}
        initialIndex={0}
        isOpen={open}
        onClose={handleClose}
        imageClassName={props.imageInModalClassName}
      />
    </Content>
  );
};
export default ImageViewer;
