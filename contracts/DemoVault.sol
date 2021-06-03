// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.2;

import "./AggregatorV3Interface.sol";

contract DemoVault {

    AggregatorV3Interface internal priceFeed;

    struct Key {
        string name;
        address holder;
        bool valid;
    }

    address payable owner;
    uint256 priceUsd;

    mapping(string => Key) public keys;

    event NewKey(string name, address holder);
    event InvalidatedKey(string name, address holder);
    event UpdatedUsdPrice(uint256 priceUsd);

    constructor() {
        owner = payable(msg.sender);
        priceUsd = 100;
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }

    function create(string memory key, address holder) private {

        keys[key] = Key({
            name: key,
            holder: holder,
            valid: true
        });

        emit NewKey(key, holder);
    }

    function updateUsdPrice(uint256 _priceUsd) public {

        require(msg.sender == owner);
        priceUsd = _priceUsd;
        emit UpdatedUsdPrice(priceUsd);
    }

    function add(string memory key, address holder) public {

        require(msg.sender == owner);
        create(key, holder);
    }

    function invalidate(string memory key) public {

        require(msg.sender == owner);
        keys[key].valid = false;
    }

    function purchase(string memory key) public payable {

        require(msg.value >= (getPrice() / 10 * 9) );

        owner.transfer(msg.value);
        create(key, msg.sender);
    }

    function isValid(string memory key) public view returns (bool) {
        return keys[key].valid;
    }

    function getPrice() public view returns (uint256) {
        (
            /* uint80 roundID */,
            int256 ethUsdFx,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();
        uint256 fxDecimals = priceFeed.decimals();
        uint256 usdToWeiFx = ( 10**fxDecimals * 10**18 ) / uint256(ethUsdFx);
        return priceUsd * usdToWeiFx;
    }
}
