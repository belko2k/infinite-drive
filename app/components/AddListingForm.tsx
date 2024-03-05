'use client';

import * as z from 'zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { ListingSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './ui/command';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

import SubmitBtn from './SubmitBtn';

import getModels from '@/actions/getModels';
import getCarTypes from '@/actions/getCarTypes';
import getCondition from '@/actions/getCondition';
import getFuelType from '@/actions/getFuelType';
import getBrands from '@/actions/getBrands';

import { cn } from '@/lib/utils';
import getTransmissions from '@/actions/getTransmissions';

const AddListingForm = () => {
  const form = useForm<z.infer<typeof ListingSchema>>({
    resolver: zodResolver(ListingSchema),
    defaultValues: {
      title: '',
      brand: '',
      model: 0,
      mileage: 0,
      price: 0,
      car_type: 0,
      power: 0,
      previous_owners: 0,
      door_count: 0,
      seat_count: 0,
      condition: 0,
      transmission: 0,
      fuel_type: 0,
    },
  });

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting },
  } = form;

  const [openBrand, setOpenBrand] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [models, setModels] = useState<any>([]);
  const [selectedModelName, setSelectedModelName] = useState<string>('');
  const [brands, setBrands] = useState<any>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [carType, setCarType] = useState<any>([]);
  const [condition, setCondition] = useState<any>([]);
  const [transmission, setTransmission] = useState<any>([]);
  const [fuelType, setFuelType] = useState<any>([]);

  useEffect(() => {
    const fetchFormData = async () => {
      const fetchedBrands = await getBrands();
      const fetchedModels = await getModels();
      const fetchedCarTypes = await getCarTypes();
      const fetchedCondition = await getCondition();
      const fetchedTransmission = await getTransmissions();
      const fetchedFuelType = await getFuelType();
      setBrands(fetchedBrands);
      setModels(fetchedModels);
      setCarType(fetchedCarTypes);
      setCondition(fetchedCondition);
      setTransmission(fetchedTransmission);
      setFuelType(fetchedFuelType);
    };

    fetchFormData();
  }, []);

  // Function to filter models based on selected brand
  const filteredModels = models.filter(
    (model: any) => model.brand.id === selectedBrand
  );

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    // Clear model when choosing brand again
    form.setValue('model', 0);
  };

  const onSubmit = (values: z.infer<typeof ListingSchema>) => {
    console.log('Form Submitted:', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* TITLE */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Title</FormLabel>
              <Input
                {...field}
                placeholder="Enter a title..."
                type="text"
                disabled={isSubmitting}
                className="text-base"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 grid-flow-row gap-6">
          {/* BRAND */}
          <FormField
            control={control}
            name="brand"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Brand</FormLabel>
                <Popover open={openBrand} onOpenChange={setOpenBrand}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openBrand}
                        className={cn(
                          ' justify-between text-base',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? field.value : 'Select brand'}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search brand..." />
                      <CommandEmpty>No brands found.</CommandEmpty>
                      <CommandGroup>
                        {brands?.map((b: any) => (
                          <CommandItem
                            value={b.brand_name}
                            key={b.id}
                            onSelect={() => {
                              form.setValue('brand', b.brand_name);
                              handleBrandSelect(b.id);
                              setOpenBrand(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                b.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {b.brand_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MODEL */}
          <FormField
            control={control}
            name="model"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Model</FormLabel>
                <Popover open={openModel} onOpenChange={setOpenModel}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openModel}
                        className={cn(
                          'justify-between text-base',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? selectedModelName : 'Select model'}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search model..." />
                      <CommandEmpty>No models found.</CommandEmpty>
                      <CommandGroup>
                        {filteredModels?.map((m: any) => (
                          <CommandItem
                            value={m.model_name}
                            key={m.id}
                            onSelect={() => {
                              form.setValue('model', m.id);
                              setSelectedModelName(m.model_name);
                              setOpenModel(false);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                m.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {m.model_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MILEAGE */}
          <FormField
            control={control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Mileage</FormLabel>
                <div className="flex">
                  <Input
                    {...field}
                    placeholder="Enter a price..."
                    type="text"
                    disabled={isSubmitting}
                    className="text-base rounded-r-none focus-visible:ring-offset-0"
                  />
                  <div className="text-white bg-foreground px-3 rounded-r-md grid content-center">
                    km
                  </div>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Price</FormLabel>
                <div className="flex">
                  <Input
                    {...field}
                    placeholder="Enter a price..."
                    type="text"
                    disabled={isSubmitting}
                    className="text-base rounded-r-none focus-visible:ring-offset-0"
                  />
                  <div className="text-white bg-foreground px-4 rounded-r-md grid content-center">
                    €
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* POWER */}
          <FormField
            control={control}
            name="power"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Power</FormLabel>
                <div className="flex">
                  <Input
                    {...field}
                    placeholder="Enter horse power..."
                    type="text"
                    disabled={isSubmitting}
                    className="text-base rounded-r-none focus-visible:ring-offset-0"
                  />
                  <div className="text-white bg-foreground px-3 rounded-r-md grid content-center">
                    Hp
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PREV. OWNERS */}
          <FormField
            control={control}
            name="previous_owners"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Previous owners</FormLabel>
                <Input
                  {...field}
                  placeholder="Enter number of owners"
                  type="text"
                  disabled={isSubmitting}
                  className="text-base"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Door count */}
          <FormField
            control={control}
            name="door_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Number of doors</FormLabel>
                <Input
                  {...field}
                  placeholder="Enter number of doors"
                  type="text"
                  disabled={isSubmitting}
                  className="text-base"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SEAT count */}
          <FormField
            control={control}
            name="seat_count"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Number of seats</FormLabel>
                <Input
                  {...field}
                  placeholder="Enter number of seats"
                  type="text"
                  disabled={isSubmitting}
                  className="text-base"
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CAR TYPE */}
          <FormField
            control={control}
            name="car_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car Type</FormLabel>
                <Select onValueChange={field.onChange} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a car type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {carType?.map((ct: any) => (
                        <SelectItem key={ct.id} value={ct.id.toString()}>
                          {ct.car_type_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONDITION */}
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Condition</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex gap-6"
                  >
                    {condition?.map((c: any) => (
                      <FormItem
                        key={c.id}
                        className="flex items-center gap-2 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={c.id} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {c.condition_type}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TRANSMISSION*/}
          <FormField
            control={control}
            name="transmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transmission</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a transmission" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {transmission?.map((t: any) => (
                        <SelectItem key={t.id} value={t.id.toString()}>
                          {t.transmission_type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* FUEL TYPE */}
          <FormField
            control={control}
            name="fuel_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Type</FormLabel>
                <Select onValueChange={field.onChange} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a fuel type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {fuelType?.map((f: any) => (
                        <SelectItem key={f.id} value={f.id.toString()}>
                          {f.fuel_type_name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* DESCRIPTION */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="You can write more information here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SubmitBtn
          label="Create a listing"
          type="submit"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
};

export default AddListingForm;
