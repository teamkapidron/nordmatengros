'use client';

// Node Modules
import { memo, useState } from 'react';

// Components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/components/base/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@repo/ui/components/base/popover';
import { Button } from '@repo/ui/components/base/button';

interface ParentCategoryComboboxProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

function ParentCategoryCombobox(props: ParentCategoryComboboxProps) {
  const { options, value: initialValue, onChange } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          {value
            ? options.find((option) => option.value === value)?.label
            : 'Velg overordnet kategori'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-[250px] w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Søk etter kategori..." />
          <CommandList>
            <CommandEmpty>Ingen resultater funnet.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    setValue(option.value);
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default memo(ParentCategoryCombobox);
