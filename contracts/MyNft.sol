// "SPDX-License-Identifier: no-licence"
pragma solidity ^0.8.0;
import "./ERC721Tradable.sol";

contract MyNft is ERC721Tradable {
// bytes32 public constant DEPOSITOR_ROLE = keccak256("DEPOSITOR_ROLE");
    constructor(address childChainManager)
        ERC721Tradable(
            "MyNft",
            "MN",
            0xF57B2c51dED3A29e6891aba85459d600256Cf317,
            "https://nft-meta-data.herokuapp.com/getMetaData/"
        )
    {

            //   _setupRole(DEPOSITOR_ROLE, childChainManager);
    }

    // modifier only(bytes32 role){
    //     require(
    //         hasRole(role, _msgSender()),
    //         "only depositor"
    //     );
    //     _;
    // }
// function deposit(address user, bytes calldata depositData)
//         external
//         only(DEPOSITOR_ROLE)
//     {
//         // deposit single
//         if (depositData.length == 32) {
//             uint256 tokenId = abi.decode(depositData, (uint256));
//             _mint(user, tokenId);

//         // deposit batch
//         } else {
//             uint256[] memory tokenIds = abi.decode(depositData, (uint256[]));
//             uint256 length = tokenIds.length;
//             for (uint256 i; i < length; i++) {
//                 _mint(user, tokenIds[i]);
//             }
//         }
//     }

    /**
     * @notice called when user wants to withdraw token back to root chain
     * @dev Should burn user's token. This transaction will be verified when exiting on root chain
     * @param tokenId tokenId to withdraw
     */
    // function withdraw(uint256 tokenId) external {
    //     require(_msgSender() == ownerOf(tokenId), "ChildERC721: INVALID_TOKEN_OWNER");
    //     _burn(tokenId);
    // }

   
}
                    