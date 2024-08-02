'use client';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface SearchProps {
  data: { value: string; label: string }[];
}

export default function Search({ data }: SearchProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const filteredCommands = Array.isArray(data)
    ? data.filter((command) =>
        command.label.toLowerCase().includes(inputValue.toLowerCase()),
      )
    : [];
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        placeholder="What's on your mind..."
        onValueChange={handleValueChange}
      />
      {
        <CommandList>
          {open &&
            filteredCommands.length > 0 &&
            filteredCommands.map((command) => (
              <CommandItem
                key={command.value}
                value={command.label}
                onSelect={() => {
                  runCommand(() => {
                    router.push(`/events/${command.value}` as string);
                  });
                }}
              >
                {command.label}
              </CommandItem>
            ))}
        </CommandList>
      }
    </Command>
  );
}