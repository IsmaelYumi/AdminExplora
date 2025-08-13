import SignupForm from '../../components/ui/SignupForm';

export default function Page() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <SignupForm />
        </div>
      </div>
    </main>
  );
}