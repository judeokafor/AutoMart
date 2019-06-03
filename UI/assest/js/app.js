/* eslint-disable no-tabs */
const mainNav = document.querySelector('#js-menu');
const navBarToggle = document.querySelector('#js-navbar-toggle');

navBarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active-nav');
});

// instantiate Epichttp library
// eslint-disable-next-line no-undef
const http = new HTTP();

const baseUrl = 'https://test-automart.herokuapp.com/api/v2/';
const homeCars = document.querySelector('#homeCars');
const screen = document.querySelector('#main-section');

const getAllUnsoldCars = async () => {
  try {
    const res = await http.get(`${baseUrl}car/unsold?status=available`);
    // console.log('unsold cars', res);
    if (res.status === 200) {
      res.data.forEach((item) => {
        homeCars.innerHTML += `
        <div class="col-12 col-md-6 col-lg-4 my-2">
					<div class="wrapper">
						<div class="container">
										<div class="top">
											<img
												src="./assest/images/images3.jpg"
												alt=""
												width="100%"
												height="100%"
											/>
										</div>
										<div class="bottom">
											<div class="left">
												<div class="details">
													<h1>${item.manufacturer} ${item.model}</h1>
													<p class="monseratt"># ${item.price}</p>
												</div>
												<div class="buy">
													<i class="material-icons">add_shopping_cart</i>
												</div>
											</div>
										</div>
									</div>
									<div class="inside">
										<div class="icon">
											<i class="material-icons">info_outline</i>
										</div>
										<div class="contents">
											<div class="d-flex justify-content-between">
												<div>
													<i class="fas fa-map-marker-alt"></i>
													<small class="mr-2">Abuja</small>
												</div>
												<div>
													<i class="fas fa-cart-plus"></i>
													<small class="mr-2">Available</small>
												</div>
											</div>
											<div class="text-white">
												<hr />
											</div>

											<div class="row">
												<div class="col-10 mx-auto">
													<div class="row">
														<div class="col-6 p-1">
															<i class="fas fa-tachometer-alt"></i>
															<small class="mr-2">${item.transmission}</small>
														</div>
														<div class="col-6 p-1 ">
															<i class="fas fa-gas-pump"></i>
															<small class="mr-2">${item.fuel_type}</small>
														</div>
														<div class="col-6 p-1">
															<i class="fas fa-car"></i>
															<small class="mr-2">${item.body_type}</small>
														</div>
														<div class="col-6 p-1">
															<i class="fas fa-calendar-alt"></i>
															<small class="mr-2">${item.year}</small>
														</div>
													</div>
												</div>
											</div>
											<div class="container text-white">
												<hr />
											</div>
											<div class="row">
												<div class="col-10 mx-auto">
													<p>
														${item.description}
													</p>
												</div>
											</div>
											<div class="d-flex justify-content-end">
										<a href="#" class="btn-more" onclick="getSingleCar(${item.carid})">
												View more
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
        `;
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const clearScreen = () => {
  screen.innerHTML = '';
};
const getSingleCar = async (id) => {
  clearScreen();
  console.log(id);
  try {
    const { status, data } = await http.get(`${baseUrl}car/${id}`);
    console.log('single value car', data);
    if (status === 200) {
      screen.innerHTML = `
      <div class="d-flex">
							<div class="w-75 mx-auto">
								<div class="container-fluid">
									<div class="row">
										<div class="card bg-light-grey">
											<div class=" p-2 row">
												<div class="col-12 col-lg-6">
													<div class="slider">
														<input
															type="radio"
															name="slider"
															title="slide1"
															checked="checked"
															class="slider__nav"
														/>
														<input
															type="radio"
															name="slider"
															title="slide2"
															class="slider__nav"
														/>
														<input
															type="radio"
															name="slider"
															title="slide3"
															class="slider__nav"
														/>
														<input
															type="radio"
															name="slider"
															title="slide4"
															class="slider__nav"
														/>
														<div class="slider__inner">
															<div class="slider__contents">
																<img
																	class="responsive-image min-width"
																	src="./assest/images/images10.jpg"
																	alt=""
																	width="400px"
																	height="400px"
																/>
															</div>
															<div class="slider__contents">
																<img
																	class="responsive-image"
																	src="./assest/images/images11.jpg"
																	alt=""
																	width="100%"
																	height="100%"
																/>
															</div>
															<div class="slider__contents">
																<img
																	class="responsive-image"
																	src="./assest/images/images2.jpg"
																	alt=""
																	width="100%"
																	height="100%"
																/>
															</div>
															<div class="slider__contents">
																<img
																	class="responsive-image "
																	src="./assest/images/images5.jpg"
																	alt=""
																	width="100%"
																	height="100%"
																/>
															</div>
														</div>
													</div>
												</div>
												<div class="col-12 col-lg-6">
													<div class="p-3">
														<div class="d-flex justify-content-between">
															<h5 class="car-title my-0">
															${data.manufacturer}
																<span>${data.model}</span>
															</h5>
															<div class="">
																<img
																	class="responsive-image"
																	src="./assest/images/svg/sold.svg"
																	alt=""
																	width="30px"
																	height="30px"
																/>
															</div>
														</div>
														<div class="d-flex justify-content-between">
															<p class="body-type my-0">
																<span class="text-abstract-orange">${data.body_type}</span>
															</p>
															<div class="">
																<img
																	class="responsive-img"
																	src="./assest/images/svg/placeholder.svg"
																	alt=""
																	width="20px"
																	height="20px"
																/>
																<small class="text-deep-purple">Abuja</small>
															</div>
															<p class="year my-0">
																<span class="text-abstract-orange">${data.year}</span>
															</p>
														</div>

														<h5
															class="text-dark-grey font-weight-bold montserrat my-1"
														>
															&#8358; ${data.price}
														</h5>

														<p class="font-weight-normal paragraph">
															${data.description}
														</p>

														<div class="d-flex justify-content-between my-2">
															<a
																href="./buyerSignIn.html"
																class="btn btn-purple clickable"
															>
																Buy Now
															</a>
															<a
																href="./index.html"
																class="btn btn-purple-reverse"
															>
																Back
															</a>
														</div>
														<div class="d-flex justify-content-end">
															<a href="./fradulent.html" class="text-red">
																<small class="text-red">Fradulent?</small>
																<img
																	src="./assest/images/svg/warning.svg"
																	alt=""
																	width="30px"
																	height="30px"
																	class="align-image"
																/>
															</a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
};
getAllUnsoldCars();
