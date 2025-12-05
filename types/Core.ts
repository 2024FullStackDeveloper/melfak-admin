export interface GlobalLayoutProps<T> {
  children: React.ReactNode;
  params: Promise<T>;
}

export interface MetadataProps {
  params: Promise<{ locale: string }>;
}

export type OptionType = {
  label: string;
  value: string | number | boolean | null | undefined;
  isActive?: boolean;
};
