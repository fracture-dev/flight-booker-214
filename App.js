import FlightCard from './FlightCard';
import FlightSearch from './FlightSearch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightDealDetails from './FlightDealDetails';
import SearchResults from './searchResults';
import SeatSelection from './SeatSelection';
import AddOns from './addOns';
import PaymentConfirmation from './PaymentConfirmation';
import LoginPage from './LoginPage'; 
import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <header className='bg-white fixed top-0 left-0 right-0 p-4 z-10 shadow-md h-100' style={{ height: "70px" }}>
              <img src='https://cdn.discordapp.com/attachments/1240306798670643302/1242357965781209088/image.png?ex=664d8b84&is=664c3a04&hm=23f3f92a3ae1622d9b9ef1b594f63f520f05e1d5346fb1b6930fa88722b6b805&' className='h-8 mr-5' ></img>
            </header>
            <div
              className="bg-cover bg-center bg-no-repeat p-4 h-[600px]"
              style={{
                backgroundImage: "url('https://ychef.files.bbci.co.uk/1280x720/p0gp95cq.jpg')",
                backgroundPosition: "center -300px"
              }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ bottom: '405px' }}>
                <FlightSearch />
              </div>
            </div>

            <div className="m-4">
              <h2 className="text-xl font-bold mb-4">Top flight destinations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <FlightCard city="New York" imageUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg" />
                <FlightCard city="Paris" imageUrl="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg" />
                <FlightCard city="Zurich" imageUrl="https://miro.medium.com/v2/resize:fit:1400/1*BTfIQPruILUid3CV7RDLjw.jpeg" />
                <FlightCard city="Tokyo" imageUrl="https://www.celebritycruises.com/blog/content/uploads/2021/03/what-is-japan-known-for-mt-fuji-hero-1920x890.jpg" />
              </div>
            </div>

            <div className="m-4">
              <br></br>
              <h2 className="text-xl font-bold mb-4">Top Deals</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <FlightCard
                  city="California"
                  imageUrl="https://i.natgeofe.com/k/5af79b71-007d-46f8-8efe-bf37a504195b/california-golden-gate-bridge_4x3.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Wellington"
                  imageUrl="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/new-zealand/wellington/best-weekend-ideas-wellington/_jcr_content/parsysTop/hero.img.full.medium.jpg/1656654311028.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Paris"
                  imageUrl="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Osaka"
                  imageUrl="https://www.celebritycruises.com/blog/content/uploads/2021/03/what-is-japan-known-for-mt-fuji-hero-1920x890.jpg"
                  priceFrom={750}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Cancún"
                  imageUrl="/path/to/paris-image.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="California"
                  imageUrl="https://i.natgeofe.com/k/5af79b71-007d-46f8-8efe-bf37a504195b/california-golden-gate-bridge_4x3.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Wellington"
                  imageUrl="https://www.qantas.com/content/travelinsider/en/explore/south-pacific/new-zealand/wellington/best-weekend-ideas-wellington/_jcr_content/parsysTop/hero.img.full.medium.jpg/1656654311028.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Paris"
                  imageUrl="https://media.tacdn.com/media/attractions-splice-spp-674x446/07/03/1c/9c.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Osaka"
                  imageUrl="https://www.celebritycruises.com/blog/content/uploads/2021/03/what-is-japan-known-for-mt-fuji-hero-1920x890.jpg"
                  priceFrom={750}
                  priceLabel="from $250/flight"
                />
                <FlightCard
                  city="Cancún"
                  imageUrl="/path/to/paris-image.jpg"
                  priceFrom={250}
                  priceLabel="from $250/flight"
                />
              </div>
            </div>
          </div>
        } />
        <Route path="/search" element={<SearchResults />}></Route>
        <Route path="/deals/:city" element={<FlightDealDetails />} />
        <Route path="/seat-select" element={<SeatSelection />} />
        <Route path="/add-ons" element={<AddOns />} />
        <Route path="/payment" element={<PaymentConfirmation />} />
        <Route path='/login' element={<LoginPage />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;