-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 19-05-2020 a las 01:43:51
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `ordersId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` enum('nuevo','confirmado','preparando','enviando','entregado','cancelado') NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`ordersId`, `userId`, `status`, `time`) VALUES
(61, 1, 'nuevo', '2020-05-09 23:03:24'),
(63, 12, 'nuevo', '2020-05-09 23:09:01'),
(109, 12, 'nuevo', '2020-05-10 01:16:49'),
(211, 1, 'nuevo', '2020-05-18 23:30:06'),
(212, 1, 'cancelado', '2020-05-18 23:32:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordersDetails`
--

CREATE TABLE `ordersDetails` (
  `ordersDetailsId` int(11) NOT NULL,
  `ordersId` int(11) NOT NULL,
  `productsId` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `partialPrice` int(11) NOT NULL,
  `paymentMethod` enum('efectivo','tarjeta') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ordersDetails`
--

INSERT INTO `ordersDetails` (`ordersDetailsId`, `ordersId`, `productsId`, `amount`, `partialPrice`, `paymentMethod`) VALUES
(5, 61, 24, 2, 20, 'tarjeta'),
(6, 63, 5, 3, 45, 'tarjeta'),
(7, 109, 15, 1, 55, 'tarjeta'),
(8, 109, 16, 2, 120, 'tarjeta'),
(189, 211, 15, 1, 55, 'efectivo'),
(190, 211, 16, 3, 180, 'efectivo'),
(191, 212, 15, 1, 55, 'efectivo'),
(192, 212, 16, 3, 180, 'efectivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `productsId` int(11) NOT NULL,
  `productsName` varchar(60) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`productsId`, `productsName`, `price`) VALUES
(1, 'polenta', 3),
(5, 'coca cola', 15),
(12, 'helado', 40),
(13, 'torta', 45),
(15, 'hamburguesa', 55),
(16, 'papas fritas', 60),
(17, 'huevo frito', 60),
(18, 'wok', 60),
(24, 'pescado', 11),
(26, 'mate con medialunas', 30);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `phone` int(20) NOT NULL,
  `address` varchar(60) NOT NULL,
  `password` varchar(30) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `username`, `fullname`, `email`, `phone`, `address`, `password`, `isAdmin`) VALUES
(1, 'maru', 'maru admin', 'admin@gmail.com', 116699, 'alsina 2333', 'adminPas', 0),
(11, 'Joses', 'joses lopez', 'joses@gmail.com', 1547977250, 'las heras 1515, palermo', 'josesPass', 1),
(12, 'Menem', 'Menem lopez', 'josess@gmail.com', 47606129, 'urquiza 2870', 'menemPass', 0),
(15, 'Menemstx', 'Mentemsx lopez', 'josess@gmail.com', 47977250, 'las heras 1515', 'menemtsxPass', 1),
(17, 'queen_freddie', 'Freddie Mercury', 'freddiemercury@gmail.com', 1147606129, '1 Logan PIKensington, London W8 6DE, UK', 'freddiePass', 0),
(18, 'santiKing', 'Santiago halbide', 'santi@gmail.com', 114550564, 'Beiro 2870, Recoleta', 'santiPassword', 0),
(19, 'CandeLove', 'cande chicote', 'candechicoteperez@gmail.com', 1155056412, 'claromeco de nieves 2870, Recoleta', 'canduchPassword', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ordersId`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `ordersDetails`
--
ALTER TABLE `ordersDetails`
  ADD PRIMARY KEY (`ordersDetailsId`),
  ADD KEY `ordersId` (`ordersId`),
  ADD KEY `productsId` (`productsId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productsId`),
  ADD UNIQUE KEY `productsName` (`productsName`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `ordersId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT de la tabla `ordersDetails`
--
ALTER TABLE `ordersDetails`
  MODIFY `ordersDetailsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=195;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `productsId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Filtros para la tabla `ordersDetails`
--
ALTER TABLE `ordersDetails`
  ADD CONSTRAINT `ordersdetails_ibfk_1` FOREIGN KEY (`ordersId`) REFERENCES `orders` (`ordersId`),
  ADD CONSTRAINT `ordersdetails_ibfk_2` FOREIGN KEY (`productsId`) REFERENCES `products` (`productsId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
