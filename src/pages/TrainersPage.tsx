import Navbar from '@/components/Navbar';
import Trainers from '@/components/Trainers';
import Footer from '@/components/Footer';

const TrainersPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <Trainers />
      </div>
      <Footer />
    </div>
  );
};

export default TrainersPage;
