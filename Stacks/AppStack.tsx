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
import IpayPage from '../pages/IpayPage';
import StoreCreditPage from '../pages/StoreCreditPage';
import LoyaltyPage from '../pages/LoyaltyPage';
import RewardsPage from '../pages/RewardsPage';
import FaqPage from '../pages/FaqPage';
import WishlistPage from '../pages/WishlistPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';

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
            <Stack.Screen name='HomePage' component={HomePage} options={{ title: 'Poplook' }} />
            <Stack.Screen name='CategoryPage' component={CategoryPage} options={{ title: 'Category' }} />
            <Stack.Screen name='CategoriesPage' component={CategoriesPage} options={{ title: 'Categories' }} />
            <Stack.Screen name='ProductListPage' component={ProductListPage} options={{ title: 'Product' }} />
            <Stack.Screen name='ProductDetailPage' component={ProductDetailPage} options={{ title: 'Product' }} />
            <Stack.Screen name='SettingPage' component={SettingPage} options={{ title: 'Setting' }} />
            <Stack.Screen name='LoginPage' component={LoginPage} options={{ title: 'Login' }} />
            <Stack.Screen name='CmsPage' component={CmsPage} />
            <Stack.Screen name='SearchPage' component={SearchPage} options={{ title: 'Search' }} />
            <Stack.Screen name='RegisterPage' component={RegisterPage} options={{ title: 'Register' }} />
            <Stack.Screen name='CartPage' component={CartPage} options={{ title: 'Cart' }} />
            <Stack.Screen name='OrderHistoryListPage' component={OrderHistoryListPage} options={{ title: 'Order History' }} />
            <Stack.Screen name='OrderHistoryDetailPage' component={OrderHistoryDetailPage} options={{ title: 'Order Details' }} />
            <Stack.Screen name='PersonalInfoPage' component={PersonalInfoPage} options={{ title: 'Personal Information' }} />
            <Stack.Screen name='PersonalInfoDetailPage' component={PersonalInfoDetailPage} options={{ title: 'Change Personal Information' }} />
            <Stack.Screen name='AddressListPage' component={AddressListPage} options={{ title: 'My Addresses' }} />
            <Stack.Screen name='AddressDetailPage' component={AddressDetailPage} options={{ title: 'Add New Address' }} />
            <Stack.Screen name='CheckoutPage' component={CheckoutPage} options={{ title: 'Order Confirmation' }} />
            <Stack.Screen name='RepayPage' component={RepayPage} options={{ title: 'Payment' }} />
            <Stack.Screen name='StoreCreditPage' component={StoreCreditPage} options={{ title: 'Store Credit' }} />
            <Stack.Screen name='LoyaltyPage' component={LoyaltyPage} options={{ title: 'Loyalty' }} />
            <Stack.Screen name='RewardsPage' component={RewardsPage} options={{ title: 'Reward' }} />
            <Stack.Screen name='FaqPage' component={FaqPage} options={{ title: 'FAQ' }} />
            <Stack.Screen name='WishlistPage' component={WishlistPage} options={{ title: 'Wishlist' }} />
            <Stack.Screen name='OrderSuccessPage' component={OrderSuccessPage} options={{ title: 'Order Confirmation' }} />
        </Stack.Navigator>
    )
}