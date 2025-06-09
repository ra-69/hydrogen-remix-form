import { formAction, SchemaForm } from 'remix-forms';
import { z } from 'zod';
import { applySchema } from 'composable-functions';
import type { Route } from './+types/test';

const schema = z.object({
  firstName: z.string().min(1),
  email: z.string().min(1).email(),
});

const mutation = applySchema(schema)(async (values) => (
  console.log(values) /* or anything else, like saveMyValues(values) */
));

export const action = async ({ request }: Route.ActionArgs) =>
  formAction({
    request,
    schema,
    mutation,
    successPath: '/', /* path to redirect on success */
  });

export default function Test() {
  return (
    <SchemaForm schema={schema} flushSync={false}>
      {({ Field, Errors, Button }) => (
        <>
          <Field name="firstName" label="First name" />
          <Field name="email" label="E-mail" />
          <Errors />
          <Button>Submit</Button>
        </>
      )}
    </SchemaForm>
  );
}
