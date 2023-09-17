type Props = {
  onChange: (value: string) => void;
};

export default function SearchBar({ onChange }: Props) {
  return (
    <input
      className="text-black mb-4"
      type="text"
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search objective"
    />
  );
}
