import { useToast } from 'native-base';


export const useCustomToast = () => {

    const nativeToast = useToast();

    show: toast

    function toast({ title = '', description, placement = 'bottom', type = 'normal' }: any) {
        const newToast = nativeToast.show({
            title: title,
            description: description,
            placement: placement,
        });

        return newToast;
    }

    return toast;
}

export function createToast({ title = '', description, placement = 'bottom', type = 'normal' }: any) {

    console.log('trying toast...');
    const toast = useToast();

    return (
        <></>
        // toast.show({
        //     title: title,
        //     description: description,
        //     placement: placement,
        // })
    );

}