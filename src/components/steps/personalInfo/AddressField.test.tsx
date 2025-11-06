import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { AddressInfo } from './AddressField';

function Wrapper({ defaultValues = {} as any }) {
    const methods = useForm({ defaultValues: { address: '', city: '', state: '', country: '', ...defaultValues } });
    return (
        <FormProvider {...methods}>
            <form>
                <AddressInfo />
            </form>
        </FormProvider>
    );
}

describe('AddressInfo (auto-fill)', () => {
    it('auto-fills state and country when typing a known city and fields are empty', async () => {
        render(<Wrapper />);

        const cityInput = screen.getByLabelText(/city/i) as HTMLInputElement;
        const stateInput = screen.getByLabelText(/state/i) as HTMLInputElement;
        const countryInput = screen.getByLabelText(/country/i) as HTMLInputElement;

        await userEvent.clear(cityInput);
        await userEvent.type(cityInput, 'Chennai');

        // Autofill should set these values
        expect(stateInput.value).toBe('Tamil Nadu');
        expect(countryInput.value).toBe('India');
    });

    it('does not overwrite state/country if they already have values', async () => {
        render(<Wrapper defaultValues={{ state: 'Existing', country: 'ExistingLand' }} />);

        const cityInput = screen.getByLabelText(/city/i) as HTMLInputElement;
        const stateInput = screen.getByLabelText(/state/i) as HTMLInputElement;
        const countryInput = screen.getByLabelText(/country/i) as HTMLInputElement;

        await userEvent.type(cityInput, 'Chennai');

        // Should keep previous values
        expect(stateInput.value).toBe('Existing');
        expect(countryInput.value).toBe('ExistingLand');
    });

    it('renders address field textarea', () => {
        render(<Wrapper />);
        const address = screen.getByLabelText(/address/i);
        expect(address.tagName.toLowerCase()).toBe('textarea');
    });
});
