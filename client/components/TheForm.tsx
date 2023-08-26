'use client'
import '../styles/form.css'
import { Box, FormControl, FormHelperText, FormLabel, Input, Center, Flex, VStack, Select, RadioGroup, HStack, Radio } from '@chakra-ui/react'

export default function TheForm () {
    return(
            <Center 
                margin={"25px 0px 35px"}>
                <VStack padding={"0px 15px"}>
                    <Input placeholder='Глубина помещения' />
                    <Input placeholder='Ширина помещения' />
                    <Input placeholder='Ширина светового проема окна' />
                    <Input placeholder='Высота светового проема окна' />
                    <Input placeholder='Высота подоконника над полом' />
                    <Input placeholder='Высота от УРП до верха оконного проема' />
                    <Input placeholder='Высота помещения' />
                    <Input placeholder='Уровень пола над землей' />
                    <Input placeholder='Толщина стены' />
                    <Input placeholder='Расстояние от внутренней поверхности стены со световым проемом до расчетной точки' />
                    <Input placeholder='Расстояние между зданиями' />
                    <Input placeholder='Высота затеняющего здания' />
                    <Input placeholder='Расчетная высота затеняющего здания' />
                    <Input placeholder='Длина затеняющего здания' />
                    <FormControl as='fieldset'>
                        <FormLabel as='legend'>
                        Выберите тип помещения
                        </FormLabel>
                        <RadioGroup defaultValue='Жилое'>
                            <HStack spacing='24px'>
                            <Radio value='Коммерческое'>Коммерческое</Radio>
                            <Radio value='Жилое'>Жилое</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    <FormControl as='fieldset'>
                        <FormLabel as='legend'>
                        Выберите местонахождение точки расчета
                        </FormLabel>
                        <RadioGroup defaultValue='По центру'>
                            <HStack spacing='24px'>
                            <Radio value='По центру'>По центру</Radio>
                            <Radio value='В метре от стены'>В метре от стены</Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                </VStack>
            </Center>
        // <div>
        //     <form>
        //         <input placeholder="Глубина помещения" type="text"></input>
        //         <input placeholder="Ширина помещения" type="text"></input>
        //         <input placeholder="Ширина светового проема окна" type="text"></input>
        //         <input placeholder="Высота светового проема окна" type="text"></input>
        //         <input placeholder="Высота подоконника над полом" type="text"></input>
        //         <input placeholder="Высота от УРП до верха оконного проема" type="text"></input>
        //         <input placeholder="Высота помещения" type="text"></input>
        //         <input placeholder="Уровень пола над землей" type="text"></input>
        //         <input placeholder="Толщина стены" type="text"></input>
        //         <input placeholder="Расстояние от внутренней поверхности стены со световым проемом до расчетной точки" type="text"></input>
        //         <input placeholder="Расстояние между зданиями " type="text"></input>
        //         <input placeholder="Высота затеняющего здания" type="text"></input>
        //         <input placeholder="Расчетная высота затеняющего здания" type="text"></input>
        //         <input placeholder="Длина затеняющего здания" type="text"></input>
        //         <select>
        //             <option disabled>Выберите тип помещения</option>
        //             <option>Коммерческое</option>
        //             <option>Жилое</option>
        //         </select>
        //         <select>
        //             <option disabled>Выберите местонахождение точки расчета</option>
        //             <option>По центру</option>
        //             <option>В метре от стены</option>
        //         </select>
        //         <button type='submit'>Расчитать</button>
        //     </form>
        // </div>
    )
}