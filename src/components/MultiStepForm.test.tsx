import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiStepForm } from './MultiStepForm';

// Helpers to reduce duplication and make queries resilient
async function fillStep1(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/national id/i), 'ABC123');

    const dateInput = screen.getByLabelText(/date of birth/i);
    await user.type(dateInput, '1990-01-01');

    const genderSelect = screen.getByLabelText(/gender/i);
    await user.selectOptions(genderSelect, 'male');

    await user.type(screen.getByLabelText(/address/i), '123 Main St');
    await user.type(screen.getByLabelText(/city/i), 'New York');
    await user.type(screen.getByLabelText(/state/i), 'NY');
    await user.type(screen.getByLabelText(/country/i), 'USA');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');

    const codeSelect = screen.getByLabelText(/code/i);
    await user.selectOptions(codeSelect, '+1');

    await user.type(screen.getByLabelText(/phone/i), '1234567890');
}

async function fillStep2(user: ReturnType<typeof userEvent.setup>) {
    await waitFor(() => {
        expect(screen.getByLabelText(/marital status/i)).toBeInTheDocument();
    });

    await user.selectOptions(screen.getByLabelText(/marital status/i), 'single');
    await user.type(screen.getByLabelText(/dependents/i), '2');
    await user.selectOptions(screen.getByLabelText(/employment status/i), 'employed');
    await user.type(screen.getByLabelText(/housing status/i), 'rented');
    await user.selectOptions(screen.getByLabelText(/currency/i), 'USD');
    await user.type(screen.getByLabelText(/monthly income/i), '5000');
}

async function fillStep3(user: ReturnType<typeof userEvent.setup>) {
    await waitFor(() => {
        const textareas = screen.getAllByRole('textbox');
        expect(textareas.length).toBeGreaterThan(0);
    }, { timeout: 3000 });

    const textareas = screen.getAllByRole('textbox');
    await user.type(textareas[0], 'This is my current financial situation description');
    await user.type(textareas[1], 'This is my employment circumstances description');
    await user.type(textareas[2], 'This is my reason for applying description');
}

async function clickNext(user: ReturnType<typeof userEvent.setup>) {
    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);
}

describe('MultiStepForm', () => {
    it('should render the form with first step (Personal Info)', () => {
        render(<MultiStepForm />);

        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/national id/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('should display all three steps in the stepper', () => {
        render(<MultiStepForm />);

        expect(screen.getByText('Personal Information')).toBeInTheDocument();
        expect(screen.getByText('Family & Financial Info')).toBeInTheDocument();
        expect(screen.getByText('Situation Descriptions')).toBeInTheDocument();
    });

    it('should show only Next button on first step', () => {
        render(<MultiStepForm />);

        expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument();
    });

    it('should show validation errors when trying to proceed with empty fields', async () => {
        const user = userEvent.setup();
        render(<MultiStepForm />);

        const nextButton = screen.getByRole('button', { name: /next/i });
        await user.click(nextButton);

        await waitFor(() => {
            // Error icons should be visible
            const svgElements = document.querySelectorAll('.text-red-500 svg');
            expect(svgElements.length).toBeGreaterThan(0);
        });
    }); it('should navigate to step 2 when step 1 is valid', async () => {
        const user = userEvent.setup();
        render(<MultiStepForm />);

        // Fill in all required fields for step 1
        await fillStep1(user);

        await clickNext(user);

        await waitFor(() => {
            expect(screen.getByText(/marital status/i)).toBeInTheDocument();
        });
    });

    it('should allow going back to previous step', async () => {
        const user = userEvent.setup();
        render(<MultiStepForm />);

        // Fill step 1 and proceed
        await fillStep1(user);
        let nextButton = screen.getByRole('button', { name: /next/i });
        await user.click(nextButton);

        // Wait for step 2
        await waitFor(() => {
            expect(screen.getByLabelText(/marital status/i)).toBeInTheDocument();
        });

        // Click back button
        const backButton = screen.getByRole('button', { name: /back/i });
        await user.click(backButton);

        // Should be back on step 1
        await waitFor(() => {
            expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
        });
    });

    it('should show Submit button on the last step', async () => {
        const user = userEvent.setup();
        render(<MultiStepForm />);

        // Navigate through all steps
        // Step 1
        await fillStep1(user);

        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 2
        await waitFor(() => {
            expect(screen.getByLabelText(/marital status/i)).toBeInTheDocument();
        });
        await fillStep2(user);

        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 3 - should have Submit button
        await waitFor(() => {
            expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
        });
    });

    it('shows a confirmation modal on submit and resets to step 1 after OK', async () => {
        const user = userEvent.setup();

        render(<MultiStepForm />);

        // Fill all steps and submit
        // Step 1
        await fillStep1(user);
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 2
        await waitFor(() => {
            expect(screen.getByLabelText(/marital status/i)).toBeInTheDocument();
        });
        await fillStep2(user);
        await user.click(screen.getByRole('button', { name: /next/i }));

        // Step 3
        await fillStep3(user);

        const submitButton = screen.getByRole('button', { name: /submit/i });
        await user.click(submitButton);

        // Modal appears
        await waitFor(() => {
            expect(screen.getByText(/form submitted/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
        }, { timeout: 3000 });

        // Confirm and ensure we return to step 1
        await user.click(screen.getByRole('button', { name: /ok/i }));
        await waitFor(() => {
            expect(screen.getByText('Personal Information')).toBeInTheDocument();
        });
    }, 10000);
});
