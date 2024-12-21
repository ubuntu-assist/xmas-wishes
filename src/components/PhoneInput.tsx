import { CheckIcon, ChevronsUpDown, Globe } from 'lucide-react'
import * as React from 'react'
import * as RPNInput from 'react-phone-number-input'
import { E164Number } from 'libphonenumber-js'
import flags from 'react-phone-number-input/flags'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type PhoneInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: E164Number | undefined) => void
    label?: string
    errorMessage?: string
  }

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, label, errorMessage, ...props }, ref) => {
      const [isFocused, setIsFocused] = React.useState(false)

      const handleChange = React.useCallback(
        (value: E164Number | undefined) => {
          onChange?.(value)
        },
        [onChange]
      )

      return (
        <div className='w-full'>
          {label && (
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              {label}
            </label>
          )}
          <div
            className={cn(
              'flex border rounded-lg transition-all duration-300',
              isFocused
                ? 'border-primary ring-2 ring-primary/30'
                : 'border-gray-300 hover:border-gray-400',
              errorMessage && 'border-destructive ring-2 ring-destructive/30'
            )}
          >
            <RPNInput.default
              ref={ref}
              className={cn('flex flex-1', className)}
              flagComponent={FlagComponent}
              countrySelectComponent={CountrySelect}
              inputComponent={InputComponent}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleChange}
              defaultCountry='CA'
              {...props}
            />
          </div>
          {errorMessage && (
            <p className='mt-1 text-sm text-destructive'>{errorMessage}</p>
          )}
        </div>
      )
    }
  )
PhoneInput.displayName = 'PhoneInput'

const InputComponent = React.forwardRef<HTMLInputElement, any>(
  ({ className, ...props }, ref) => (
    <input
      className={cn(
        'flex-1 px-3 py-2 rounded-e-lg rounded-s-none',
        'bg-background outline-none text-foreground',
        'placeholder:text-muted-foreground',
        'text-sm',
        className
      )}
      placeholder='Enter phone number'
      {...props}
      ref={ref}
    />
  )
)

type CountrySelectOption = { label: string; value: RPNInput.Country }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  onChange: (value: RPNInput.Country) => void
  options: CountrySelectOption[]
}

const CountrySelect = ({
  disabled,
  value,
  onChange,
  options,
}: CountrySelectProps) => {
  const [open, setOpen] = React.useState(false)
  const handleSelect = React.useCallback(
    (country: RPNInput.Country) => {
      onChange(country)
      setOpen(false)
    },
    [onChange]
  )

  return (
    <TooltipProvider>
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                type='button'
                variant={'ghost'}
                className={cn(
                  'flex gap-2 rounded-e-none rounded-s-lg px-3',
                  'hover:bg-accent hover:text-accent-foreground',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                disabled={disabled}
              >
                <FlagComponent country={value} countryName={value} />
                <ChevronsUpDown
                  className={cn(
                    'h-4 w-4 opacity-50 transition-opacity',
                    disabled ? 'hidden' : 'opacity-100'
                  )}
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select Country</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className='w-[350px] p-0 shadow-2xl'>
          <Command>
            <div className='flex items-center border-b px-3 py-2'>
              <Globe className='mr-2 h-4 w-4 opacity-50' />
              <CommandInput
                placeholder='Search country...'
                className='flex-1'
              />
            </div>
            <CommandList>
              <ScrollArea className='h-80'>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {options
                    .filter((x) => x.value)
                    .map((option) => (
                      <CommandItem
                        className='gap-3 group'
                        key={option.value}
                        onSelect={() => handleSelect(option.value)}
                      >
                        <FlagComponent
                          country={option.value}
                          countryName={option.label}
                        />
                        <div className='flex-1'>
                          <span className='text-sm font-medium group-hover:text-primary'>
                            {option.label}
                          </span>
                        </div>
                        {option.value && (
                          <span className='text-foreground/50 text-xs'>
                            {`+${RPNInput.getCountryCallingCode(option.value)}`}
                          </span>
                        )}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4 transition-opacity',
                            option.value === value
                              ? 'opacity-100 text-primary'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span
      className='flex h-5 w-7 overflow-hidden rounded-sm shadow-sm transition-all 
                 group-hover:scale-105 group-hover:shadow-md'
    >
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
FlagComponent.displayName = 'FlagComponent'

export { PhoneInput }
