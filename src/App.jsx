import BookingsChart from "./BookingsChart";
import FareChart from "./FareChart";
import CancellationChart from "./CancellationChart";
import ClassDistributionChart from "./ClassDistributionChart";
import ClassDistributionChart2 from "./ClassDistributionChart2";
import ClassDistributionChart3 from "./ClassDistributionChart3";
function App() {
  return (
    <>
    <h1>Bookings Chart</h1>
    <BookingsChart />
    <h1>Fare Chart</h1>
    <FareChart />
    <h1>Cancellation Chart</h1>
    <CancellationChart />
    <h1>Class Distribution Chart 1</h1>
    <ClassDistributionChart />
    <h1>Class Distribution Chart 2</h1>
    <ClassDistributionChart2 />
    <h1>Class Distribution Chart 3</h1>
    <ClassDistributionChart3 />
    </>
  );
}

export default App;
