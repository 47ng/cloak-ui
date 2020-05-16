import React from 'react'
import Stack, { StackProps } from '@chakra-ui/core/dist/Stack'
import { RadioProps } from '@chakra-ui/core/dist/Radio'
import RadioButtonGroup, {
  RadioButtonGroupProps
} from '@chakra-ui/core/dist/RadioButtonGroup'
import Button from '@chakra-ui/core/dist/Button'
import Text from '@chakra-ui/core/dist/Text'
import Textarea from '@chakra-ui/core/dist/Textarea'

export interface ApplyViewProps extends StackProps {}

export const ApplyView: React.FC<ApplyViewProps> = ({ ...props }) => {
  const [direction, setDirection] = React.useState(ApplyDirection.encrypt)

  return (
    <Stack {...props}>
      <Direction value={direction} onChange={setDirection} mx="auto" />
      <Stack display="flex" isInline>
        <Stack flex={1}>
          <Text>
            {direction === ApplyDirection.encrypt
              ? 'Enter plain text'
              : 'Encrypted text'}
          </Text>
          <Textarea />
        </Stack>
        <Stack flex={1}>
          <Text textAlign="right">
            {direction === ApplyDirection.encrypt ? 'Encrypted' : 'Decrypted'}
          </Text>
          <Textarea />
        </Stack>
      </Stack>
    </Stack>
  )
}

// --

export enum ApplyDirection {
  encrypt = 'encrypt',
  decrypt = 'decrypt'
}

export interface DirectionProps
  extends Omit<RadioButtonGroupProps, 'value' | 'onChange'> {
  value: ApplyDirection
  onChange: (value: ApplyDirection) => void
}

export const Direction: React.FC<DirectionProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <RadioButtonGroup
      spacing={0}
      value={value}
      onChange={onChange as any}
      isInline
      {...props}
    >
      <RadioButton
        value={ApplyDirection.encrypt}
        borderRightWidth={0}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
      >
        Encrypt
      </RadioButton>
      <RadioButton
        value={ApplyDirection.decrypt}
        borderLeftWidth={0}
        borderTopLeftRadius={0}
        borderBottomLeftRadius={0}
      >
        Decrypt
      </RadioButton>
    </RadioButtonGroup>
  )
}

const RadioButton = React.forwardRef<unknown, RadioProps>((props, ref) => {
  const { isChecked, children, ...rest } = props
  return (
    <Button
      ref={ref}
      variantColor={isChecked ? 'indigo' : 'gray'}
      aria-checked={isChecked}
      role="radio"
      size="sm"
      borderWidth="1px"
      borderColor={isChecked ? 'indigo.600' : 'gray.400'}
      w={24}
      {...rest}
      variant={isChecked ? 'solid' : 'outline'}
    >
      {children}
    </Button>
  )
})
