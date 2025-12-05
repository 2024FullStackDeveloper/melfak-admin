import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Content from "../../template/content/Content";
import Row from "../../template/row/Row";
import Text from "../../text/Text";
import Col from "../../template/col/Col";

type Props = {
  title?: string;
  addButtonTitle?: string;
  addButtonClassName?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  addButtonIconClassName?: string;
  onAddButtonClick?: () => void;
  subHeaderComponents?: React.ReactNode;
  hideAddButton?: boolean;
};

const TableSubHeader = (props: Props) => {
  return (
    <Content grid gridCols={8} gridGap={4} className="w-full">
      <Row className="col-span-8 w-full justify-between items-center">
        <Text type={"header5"}>{props?.title || ""}</Text>
        {!props.hideAddButton && (
          <Button
            variant={props.variant || "default"}
            onClick={props.onAddButtonClick}
            className={props.addButtonClassName}
          >
            {props.addButtonTitle || "إضافة"}
            <PlusIcon size={16} className="ml-2" />
          </Button>
        )}
      </Row>
      <Col className="col-span-8">{props.subHeaderComponents}</Col>
    </Content>
  );
};

export default TableSubHeader;
