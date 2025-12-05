"use client";
import Select, { SelectProps } from "@/components/core/select/Select";
import Col from "@/components/core/template/col/Col";
import Row from "@/components/core/template/row/Row";
import Text from "@/components/core/text/Text";
import useLocalizer from "@/hooks/useLocalizer";
import useGetServices from "@/services/API/fetching/serviceItems/useGetServices";
import { IService } from "@/types/Section";
import React, { useMemo } from "react";

interface Props extends Omit<SelectProps, "options" | "onChange"> {
  label?: string;
  errorMessage?: string;
  allowWithoutSelection?: boolean;
  onChange?: (value: string | null) => void;
}

const ServiceSelect: React.FC<Props> = ({
  onChange,
  label,
  value,
  error,
  errorMessage,
  allowWithoutSelection = false,
  ...props
}) => {
  const { locale } = useLocalizer();
  const { data: services, isLoading } = useGetServices({
    page: 1,
    size: 1000, 
    all: true,
    lang: locale,
  });

  const options = useMemo(() => {
    let opts = services.map((unit: IService) => ({
      label: locale === "ar" ? unit.arTitle : unit.enTitle,
      value: unit.id,
    }));

    if (allowWithoutSelection) {
      opts.unshift({
        label: "بدون اختيار",
        value: "null_value", // Use a string representation for null
      });
    }
    return opts;
  }, [services, locale, allowWithoutSelection]);

  const handleChange = (val: string) => {
    if (val === "null_value") {
      onChange?.(null);
    } else {
      onChange?.(val);
    }
  };

  return (
    <Col>
      {label && (
        <Text className="text-grey-500 mb-2" type="bodyXSmallBold">
          {label}
        </Text>
      )}
      <Select
        {...props}
        options={options}
        value={value === null ? "null_value" : value}
        onChange={handleChange}
        placeholder={props?.placeholder}
        noOptionsMessage={props?.noOptionsMessage}
        error={error}
        disabled={isLoading || props.disabled}
      />
      {error && (
        <Row className="mt-2 w-full items-center justify-start">
          <Text type="bodyXSmallBold" className="text-danger">
            {errorMessage}
          </Text>
        </Row>
      )}
    </Col>
  );
};

export default ServiceSelect;
