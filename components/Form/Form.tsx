/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { useForm, FormProvider, SubmitHandler, FieldValues } from 'react-hook-form';

type TConfigProps = {
    resolver?: any;
    defaultValues?: Record<string, any>;
}

type Props = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>
} & TConfigProps;

const Form = ({ children, onSubmit, resolver, defaultValues }: Props) => {
    const formConfig: TConfigProps = {};
    if (resolver) {
        formConfig['resolver'] = resolver;
    }

    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues;
    }

    const methods = useForm<FieldValues>(formConfig);

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (onSubmit) {
            await onSubmit(data);
            // methods.reset();
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default Form;
