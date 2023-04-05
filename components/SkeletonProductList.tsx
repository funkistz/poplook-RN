import { Box, HStack,VStack, Skeleton, IconButton, Text, View } from 'native-base';

export function Body () {
    return <>
        <HStack h={250}>
            <VStack w="50%">
                <Box w={'100%'} p={3}>
                    <Skeleton h="full" borderRadius={10} startColor="muted.300" />
                </Box>
                <HStack px={3} width={'70%'} >
                    <VStack  style={{ width: 140, height: 30}}>
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" />
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" mt={2} />
                    </VStack>

                    <Box alignItems="center" style={{ width: 40, height: 30 }} >
                        <Skeleton size="6" rounded="full" startColor="muted.300" />
                    </Box>
                </HStack>
            </VStack>


            <VStack w="50%">
                <Box w={'100%'} p={3}>
                    <Skeleton h="full" borderRadius={10} startColor="muted.300" />
                </Box>
                <HStack px={3} width={'70%'} >
                    <VStack  style={{ width: 140, height: 30}}>
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" />
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" mt={2} />
                    </VStack>

                    <Box alignItems="center" style={{ width: 40, height: 30 }} >
                        <Skeleton size="6" rounded="full" startColor="muted.300" />
                    </Box>
                </HStack>
            </VStack>
        </HStack>

        <HStack h={250} mt={30}>
            <VStack w="50%">
                <Box w={'100%'} p={3}>
                    <Skeleton h="full" borderRadius={10} startColor="muted.300" />
                </Box>
                <HStack px={3} width={'70%'} >
                    <VStack  style={{ width: 140, height: 30}}>
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" />
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" mt={2} />
                    </VStack>

                    <Box alignItems="center" style={{ width: 40, height: 30 }} >
                        <Skeleton size="6" rounded="full" startColor="muted.300" />
                    </Box>
                </HStack>
            </VStack>


            <VStack w="50%">
                <Box w={'100%'} p={3}>
                    <Skeleton h="full" borderRadius={10} startColor="muted.300" />
                </Box>
                <HStack px={3} width={'70%'} >
                    <VStack  style={{ width: 140, height: 30}}>
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" />
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" mt={2} />
                    </VStack>

                    <Box alignItems="center" style={{ width: 40, height: 30 }} >
                        <Skeleton size="6" rounded="full" startColor="muted.300" />
                    </Box>
                </HStack>
            </VStack>
        </HStack>

        <HStack h={250} mt={30}>
            <VStack w="50%">
                <Box w={'100%'} p={3}>
                    <Skeleton h="full" borderRadius={10} startColor="muted.300" />
                </Box>
                <HStack px={3} width={'70%'} >
                    <VStack  style={{ width: 140, height: 30}}>
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" />
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" mt={2} />
                    </VStack>

                    <Box alignItems="center" style={{ width: 40, height: 30 }} >
                        <Skeleton size="6" rounded="full" startColor="muted.300" />
                    </Box>
                </HStack>
            </VStack>


            <VStack w="50%">
                <Box w={'100%'} p={3}>
                    <Skeleton h="full" borderRadius={10} startColor="muted.300" />
                </Box>
                <HStack px={3} width={'70%'} >
                    <VStack  style={{ width: 140, height: 30}}>
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" />
                    <Skeleton h="1" flex="0.5" rounded="full" startColor="muted.300" mt={2} />
                    </VStack>

                    <Box alignItems="center" style={{ width: 40, height: 30 }} >
                        <Skeleton size="6" rounded="full" startColor="muted.300" />
                    </Box>
                </HStack>
            </VStack>
        </HStack>
    </>
}

export function Filter () {
    return <>
        <HStack w="100%"  backgroundColor={'white'}>
            <Skeleton ml={3} h="8" w={'full'} flex="1" rounded="full" startColor="muted.300" mt={2} mb={3}/>
            <Skeleton ml={3} h="8" w={'full'} flex="1" rounded="full" startColor="muted.300" mt={2} mb={3}/>
            <Skeleton ml={3} h="8" w={'full'} flex="1" rounded="full" startColor="muted.300" mt={2} mb={3}/>
            <Skeleton ml={3} h="8" w={'full'} flex="1" rounded="full" startColor="muted.300" mt={2} mb={3}/>
            <Skeleton ml={3} h="8" w={'full'} flex="1" rounded="full" startColor="muted.300" mt={2} mb={3}/>
            <Skeleton ml={3} h="8" w={'full'} flex="1" rounded="full" startColor="muted.300" mt={2} mb={3}/>
        </HStack>
    </>
}

export function Header () {
    return <>
        <HStack py="2" justifyContent="space-between" alignItems="center" w="100%" maxW="100%" backgroundColor={'white'}>
            <HStack pt={1} alignItems="center" w="20%">
                <Skeleton ml={3} h="5" w={'full'} flex="1" rounded="full" startColor="muted.300" />
            </HStack>
            <HStack pt={1} pr={3} justifyContent="flex-end" w="20%">
                <Skeleton mt={1} mr={2} h="5" w={'full'} flex="1" rounded="full" startColor="muted.300" />
                <Skeleton size="6" rounded="full" startColor="muted.300" />
            </HStack>
        </HStack>
    </>
}


export default function SkeletonProductList({filter , containerOnly}:{filter: boolean, containerOnly: boolean}) {

    return (
        <>
            { containerOnly && <Body />}

            { !containerOnly && 
                <>
                    <Header />
                    { filter &&  <Filter />}
                    <Body />
                </>
            }
        </>
    );
}