import {
  Box,
  FormControl,
  Heading,
  Input,
  NativeOption,
  NativeSelect,
  Radio,
  Textarea,
  VStack,
} from "@yamada-ui/react";

const DescriptionsForm = () => {
  return (
    <Box
      border="1px solid #ccc"
      borderRadius="8px"
      padding="4"
      width="100%"
      maxWidth="500px"
    >
      <VStack spacing={2} width="80%">
        <Heading as="h5" size="md" isTruncated>
          名古屋駅 スターバックス前
        </Heading>
        <FormControl
          isRequired
          label="場所の名前"
          errorMessage="場所の名前は必須です"
        >
          <Input placeholder="" />
        </FormControl>

        <FormControl
          isRequired
          label="種類"
          errorMessage="種類の選択は必須です"
        >
          <Radio size="sm">男子トイレ🚹</Radio>
          <Radio size="md">女子トイレ🚺</Radio>
          <Radio size="lg">共用トイレ🚻</Radio>
        </FormControl>

        <FormControl label="詳細">
          <Textarea placeholder="例：綺麗な状態ですが、やや狭いです。"></Textarea>
        </FormControl>

        <FormControl
          isRequired
          label="衛生レベル"
          errorMessage="衛生レベルの選択は必須です"
        >
          <NativeSelect placeholder="レベルを選択">
            <NativeOption value="5">かなり綺麗</NativeOption>
            <NativeOption value="4">綺麗</NativeOption>
            <NativeOption value="3">普通</NativeOption>
            <NativeOption value="2">汚い</NativeOption>
            <NativeOption value="1">かなり汚い</NativeOption>
          </NativeSelect>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default DescriptionsForm;
