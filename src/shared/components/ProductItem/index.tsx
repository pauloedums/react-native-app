import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { AspectRatio, Box, Center, Heading, Stack, Text } from 'native-base';
import { IProduct } from '../../../interfaces/product.interface';
import { Image } from 'react-native';
import { imageService } from '../../../services/image.service';


type Props = { product: IProduct }

export default function ProductItem({ product }: Props) {

    const formattedQuery = (productName: string) => productName.replace(' ', '-').toLowerCase().trim();
    const [ refreshing, setRefreshing ] = React.useState(false);
    const [ myProduct, setMyProduct ] = React.useState(product);

    React.useEffect(() => {
        productImage(myProduct);
    }, []);
    const numberFormat = 
        (value: number) => 
            new Intl.NumberFormat('pt-BR', 
                {
                    style: 'currency',
                    currency:  'BRL',
                    minimumFractionDigits: 2
                }
            ).format(value);

    async function productImage(product: IProduct){
        
        const image = await imageService.read(formattedQuery(product.name));
        setMyProduct({
          ...product,
          image
        });

    }

    return (

      <Box
        m="5"
        maxW="290"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}>
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
                uri: myProduct.image
            }}
          />
        </AspectRatio>
        <Center
          bg="violet.500"
          _dark={{
            bg: "violet.400",
          }}
          _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "xs",
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5"
        >
          {myProduct.factory.name}
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            {myProduct.name}
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: "violet.500",
            }}
            _dark={{
              color: "violet.400",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            Quantidade disponível: {myProduct.amount}
          </Text>
        </Stack>
        <Text fontWeight="400">
          {numberFormat(myProduct.price)}
        </Text>
      </Stack>
    </Box>
    );
}