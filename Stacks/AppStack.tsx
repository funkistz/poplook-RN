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
import CategoryPage2 from '../pages/CategoryPage';
import CustomPage from '../pages/CustomPage';

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

            <Stack.Screen name='CategoryPage' component={CategoryPage} options={{ title: route.params ? route.params.title : 'Category', animation: 'none' }} />
            <Stack.Screen name='CategoriesPage' component={CategoriesPage} options={{ title: 'Categories', animation: 'none' }} />
            <Stack.Screen name='ProductListPage' component={ProductListPage} options={{ title: 'Product', animation: 'none' }} />
            {/* <Stack.Screen name='ProductDetailPage' component={ProductDetailPage} options={{ title: '' }} /> */}
            <Stack.Screen name='SettingPage' component={SettingPage} options={{ title: 'Setting', animation: 'none' }} />
            <Stack.Screen name='LoginPage' component={LoginPage} options={{ title: 'Login', animation: 'none' }} />
            <Stack.Screen name='ForgotPassword' component={ForgotPassword} options={{ title: 'Forgot Password', animation: 'none' }} />
            <Stack.Screen name='CmsPage' component={CmsPage} options={{ animation: 'none' }}/>
            <Stack.Screen name='SearchPage' component={SearchPage} options={{ title: 'Search', animation: 'none' }} />
            <Stack.Screen name='RegisterPage' component={RegisterPage} options={{ title: 'Register', animation: 'none' }} />
            <Stack.Screen name='CartPage' component={CartPage} options={{ title: 'Cart', animation: 'none' }} />
            <Stack.Screen name='OrderHistoryListPage' component={OrderHistoryListPage} options={{ title: 'Order History', animation: 'none' }} />
            <Stack.Screen name='OrderHistoryDetailPage' component={OrderHistoryDetailPage} options={{ title: 'Order Details', animation: 'none' }} />
            <Stack.Screen name='PersonalInfoPage' component={PersonalInfoPage} options={{ title: 'Personal Information', animation: 'none' }} />
            <Stack.Screen name='PersonalInfoDetailPage' component={PersonalInfoDetailPage} options={{ title: 'Update Email', animation: 'none'}} />
            <Stack.Screen name='AddressListPage' component={AddressListPage} options={{ title: 'My Addresses', animation: 'none' }} />
            <Stack.Screen name='AddressDetailPage' component={AddressDetailPage} options={{ title: 'Add New Address', animation: 'none' }} />
            <Stack.Screen name='CheckoutPage' component={CheckoutPage} options={{ title: 'Order Confirmation', animation: 'none' }} />
            <Stack.Screen name='RepayPage' component={RepayPage} options={{ title: 'Payment', animation: 'none'}} />
            <Stack.Screen name='StoreCreditPage' component={StoreCreditPage} options={{ title: 'Store Credit', animation: 'none' }} />
            <Stack.Screen name='LoyaltyPage' component={LoyaltyPage} options={{ title: 'Loyalty', animation: 'none' }} />
            <Stack.Screen name='RewardsPage' component={RewardsPage} options={{ title: 'Rewards', animation: 'none' }} />
            <Stack.Screen name='FaqPage' component={FaqPage} options={{ title: 'FAQ', animation: 'none' }} />
            <Stack.Screen name='WishlistPage' component={WishlistPage} options={{ title: 'Wishlist', animation: 'none' }} />
            <Stack.Screen name='CustomerServicePage' component={CustomerServicePage} options={{ title: 'Customer Service', animation: 'none' }} />
            <Stack.Screen name='CustomerServiceDetailsPage' component={CustomerServiceDetailsPage} options={{ title: 'Customer Service', animation: 'none' }} />
            <Stack.Screen name='DeleteAccountPage' component={DeleteAccountPage} options={{ title: 'Delete My Account', animation: 'none' }} />
            <Stack.Screen name='DeleteAccountSuccessPage' component={DeleteAccountSuccessPage} options={{ title: 'Confirmation Delete Account', animation: 'none' }} />
            <Stack.Screen name='VisitStorePage' component={VisitStorePage} options={{ title: 'Visit Our Stores', animation: 'none' }} />
            <Stack.Screen name='FollowUsPage' component={FollowUsPage} options={{ title: 'Follow Us', animation: 'none' }} />
            <Stack.Screen name='DeliveryReturnsPage' component={DeliveryReturnsPage} options={{ title: 'Delivery & Returns', animation: 'none' }} />
            <Stack.Screen name='NewBannerPage' component={NewBannerPage} options={{ title: 'New Banner', animation: 'none' }} />
            <Stack.Screen name='CategoryPage2' component={CategoryPage2} options={{ title: 'Categories', animation: 'none' }} />
            <Stack.Screen name='CustomPage' component={CustomPage} options={{ title: '', animation: 'none' }} />
        </Stack.Navigator>
    )
}
