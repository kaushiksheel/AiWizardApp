import React, { FC,ReactNode } from 'react'
import {Box,Container as Ctnr} from '@chakra-ui/react';

export const Container:FC<{children:ReactNode}> = ({children}) => {
  return (
  <Ctnr maxW={'5xl'}>
{children}
  </Ctnr>
  )
}
