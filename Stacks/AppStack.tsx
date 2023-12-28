import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/Home';
import CategoriesPage from '../pages/Categories';
import RightHeader from '../components/Header/RightHeader';
import CategoryPage from '../pages/Category';
import ProductListPage from '../pages/ProductList';
import ProductDetailPage from '../pages/ProductDetail';
import SettingPage from '../pages/SettingPage';
import LoginPage from '../pages/LoginPage';
import PersonalInfoPage from '../pages/PersonalInfoPage';
import PersonalInfoDetailPage from '../pages/PersonalInfoDetailPage';
import CmsPage from '../pages/CmsPage';
import SearchPage from '../pages/SearchPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import OrderHistoryListPage from '../pages/OrderHistoryListPage';
import OrderHistoryDetailPage from '../pages/OrderHistoryDetailPage';
import AddressListPage from '../pages/AddressListPage';
import AddressDetailPage from '../pages/AddressDetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import RepayPage from '../pages/RepayPage';
import StoreCreditPage from '../pages/StoreCreditPage';
import LoyaltyPage from '../pages/LoyaltyPage';
import RewardsPage from '../pages/RewardsPage';
import FaqPage from '../pages/FaqPage';
import WishlistPage from '../pages/WishlistPage';
import CustomerServicePage from '../pages/CustomerServicePage';
import CustomerServiceDetailsPage from '../pages/CustomerServiceDetailsPage';
import WebviewPage from '../pages/EghlPaymentPage';
import ForgotPassword from '../pages/ForgotPassword';
import DeleteAccountPage from '../pages/DeleteAccountPage';
import DeleteAccountSuccessPage from '../pages/DeleteAccountSuccessPage';
import VisitStorePage from '../pages/VisitStore';
import FollowUsPage from '../pages/FollowUsPage';
import DeliveryReturnsPage from '../pages/DeliveryReturnsPage';
import { Image, Center, Box } from 'native-base';
import NewBannerPage from '../pages/NewBannerPage';
import BannerPage from '../pages/BannerPage';
import CategoryPage2 from '../pages/CategoryPage';

const Stack = createNativeStackNavigator();

export default function AppStack({ route, navigation, initialRoute }: { route: any, navigation: any, initialRoute: any }) {

    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];

    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{
            // header: AppBar,
            headerTintColor: 'black',
            headerRight: () => (<RightHeader navigation={navigation}></RightHeader>),
            headerBackTitle: ''
            // headerLeft: () => (<LeftHeader navigation={navigation}></LeftHeader>)
        }}>

            <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    headerTitle: () => (
                        <>
                            <Box>
                                <Center>
                                    <Image style={{ width: 100, height: 29 }} source={{uri: "https://poplook.com/assets/img/logo.png"}} alt='Poplook Logo' size="sm" />
                                </Center>
                            </Box>
                        </>
                    )
                }}
            />

            <Stack.Screen name='CategoryPage' component={CategoryPage} options={{ title: route.params ? route.params.title : 'Category' }} />
            <Stack.Screen name='CategoriesPage' component={CategoriesPage} options={{ title: 'Categories' }} />
            <Stack.Screen name='ProductListPage' component={ProductListPage} options={{ title: 'Product' }} />
            {/* <Stack.Screen name='ProductDetailPage' component={ProductDetailPage} options={{ title: '' }} /> */}
            <Stack.Screen name='SettingPage' component={SettingPage} options={{ title: 'Setting' }} />
            <Stack.Screen name='LoginPage' component={LoginPage} options={{ title: 'Login' }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Forgot Password' }} />
            <Stack.Screen name='CmsPage' component={CmsPage} />
            <Stack.Screen name='SearchPage' component={SearchPage} options={{ title: 'Search' }} />
            <Stack.Screen name='RegisterPage' component={RegisterPage} options={{ title: 'Register' }} />
            <Stack.Screen name='CartPage' component={CartPage} options={{ title: 'Cart' }} />
            <Stack.Screen name='OrderHistoryListPage' component={OrderHistoryListPage} options={{ title: 'Order History' }} />
            <Stack.Screen name='OrderHistoryDetailPage' component={OrderHistoryDetailPage} options={{ title: 'Order Details' }} />
            <Stack.Screen name='PersonalInfoPage' component={PersonalInfoPage} options={{ title: 'Personal Information' }} />
            <Stack.Screen name='PersonalInfoDetailPage' component={PersonalInfoDetailPage} options={{ title: 'Update Email' }} />
            <Stack.Screen name='AddressListPage' component={AddressListPage} options={{ title: 'My Addresses' }} />
            <Stack.Screen name='AddressDetailPage' component={AddressDetailPage} options={{ title: 'Add New Address' }} />
            <Stack.Screen name='CheckoutPage' component={CheckoutPage} options={{ title: 'Order Confirmation' }} />
            <Stack.Screen name='RepayPage' component={RepayPage} options={{ title: 'Payment' }} />
            <Stack.Screen name='StoreCreditPage' component={StoreCreditPage} options={{ title: 'Store Credit' }} />
            <Stack.Screen name='LoyaltyPage' component={LoyaltyPage} options={{ title: 'Loyalty' }} />
            <Stack.Screen name='RewardsPage' component={RewardsPage} options={{ title: 'Rewards' }} />
            <Stack.Screen name='FaqPage' component={FaqPage} options={{ title: 'FAQ' }} />
            <Stack.Screen name='WishlistPage' component={WishlistPage} options={{ title: 'Wishlist' }} />
            <Stack.Screen name='CustomerServicePage' component={CustomerServicePage} options={{ title: 'Customer Service' }} />
            <Stack.Screen name='CustomerServiceDetailsPage' component={CustomerServiceDetailsPage} options={{ title: 'Customer Service' }} />
            <Stack.Screen name='DeleteAccountPage' component={DeleteAccountPage} options={{ title: 'Delete My Account' }} />
            <Stack.Screen name='DeleteAccountSuccessPage' component={DeleteAccountSuccessPage} options={{ title: 'Confirmation Delete Account' }} />
            <Stack.Screen name='VisitStorePage' component={VisitStorePage} options={{ title: 'Visit Our Stores' }} />
            <Stack.Screen name='FollowUsPage' component={FollowUsPage} options={{ title: 'Follow Us' }} />
            <Stack.Screen name='DeliveryReturnsPage' component={DeliveryReturnsPage} options={{ title: 'Delivery & Returns' }} />
            <Stack.Screen name='NewBannerPage' component={NewBannerPage} options={{ title: 'New Banner' }} />
            <Stack.Screen name='BannerPage' component={BannerPage} options={{ title: 'Banner' }} />
            <Stack.Screen name='CategoryPage2' component={CategoryPage2} options={{ title: 'Categories' }} />
        </Stack.Navigator>
    )
}
