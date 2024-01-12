// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

// import type lookup before we augment - in some environments
// this is required to allow for ambient/previous definitions
import '@polkadot/types/types/registry';

import type {
  CommonRuntimeEntitiesIdtyData,
  CommonRuntimeEntitiesValidatorFullIdentification,
  FinalityGrandpaEquivocationPrecommit,
  FinalityGrandpaEquivocationPrevote,
  FinalityGrandpaPrecommit,
  FinalityGrandpaPrevote,
  FrameSupportDispatchDispatchClass,
  FrameSupportDispatchDispatchInfo,
  FrameSupportDispatchPays,
  FrameSupportDispatchPerDispatchClassU32,
  FrameSupportDispatchPerDispatchClassWeight,
  FrameSupportDispatchPerDispatchClassWeightsPerClass,
  FrameSupportDispatchRawOrigin,
  FrameSupportPalletId,
  FrameSupportPreimagesBounded,
  FrameSupportTokensMiscBalanceStatus,
  FrameSystemAccountInfo,
  FrameSystemCall,
  FrameSystemError,
  FrameSystemEvent,
  FrameSystemEventRecord,
  FrameSystemExtensionsCheckGenesis,
  FrameSystemExtensionsCheckNonZeroSender,
  FrameSystemExtensionsCheckNonce,
  FrameSystemExtensionsCheckSpecVersion,
  FrameSystemExtensionsCheckTxVersion,
  FrameSystemExtensionsCheckWeight,
  FrameSystemLastRuntimeUpgradeInfo,
  FrameSystemLimitsBlockLength,
  FrameSystemLimitsBlockWeights,
  FrameSystemLimitsWeightsPerClass,
  FrameSystemPhase,
  GdevRuntimeOpaqueSessionKeys,
  GdevRuntimeOriginCaller,
  GdevRuntimeProxyType,
  GdevRuntimeRuntime,
  PalletAtomicSwapBalanceSwapAction,
  PalletAtomicSwapCall,
  PalletAtomicSwapError,
  PalletAtomicSwapEvent,
  PalletAtomicSwapPendingSwap,
  PalletAuthorityMembersCall,
  PalletAuthorityMembersError,
  PalletAuthorityMembersEvent,
  PalletAuthorityMembersMemberData,
  PalletBabeCall,
  PalletBabeError,
  PalletBalancesAccountData,
  PalletBalancesBalanceLock,
  PalletBalancesCall,
  PalletBalancesError,
  PalletBalancesEvent,
  PalletBalancesIdAmount,
  PalletBalancesReasons,
  PalletBalancesReserveData,
  PalletCertificationCall,
  PalletCertificationError,
  PalletCertificationEvent,
  PalletCertificationIdtyCertMeta,
  PalletCollectiveCall,
  PalletCollectiveError,
  PalletCollectiveEvent,
  PalletCollectiveRawOrigin,
  PalletCollectiveVotes,
  PalletDistanceCall,
  PalletDistanceDistanceStatus,
  PalletDistanceError,
  PalletDistanceEvaluationPool,
  PalletDistanceMedianMedianAcc,
  PalletDuniterAccountAccountData,
  PalletDuniterAccountCall,
  PalletDuniterAccountEvent,
  PalletDuniterTestParametersParameters,
  PalletDuniterWotError,
  PalletDuniterWotIdtyRemovalWotReason,
  PalletGrandpaCall,
  PalletGrandpaError,
  PalletGrandpaEvent,
  PalletGrandpaStoredPendingChange,
  PalletGrandpaStoredState,
  PalletIdentityCall,
  PalletIdentityError,
  PalletIdentityEvent,
  PalletIdentityIdtyRemovalReason,
  PalletIdentityIdtyStatus,
  PalletIdentityIdtyValue,
  PalletImOnlineBoundedOpaqueNetworkState,
  PalletImOnlineCall,
  PalletImOnlineError,
  PalletImOnlineEvent,
  PalletImOnlineHeartbeat,
  PalletImOnlineSr25519AppSr25519Public,
  PalletImOnlineSr25519AppSr25519Signature,
  PalletMembershipCall,
  PalletMembershipError,
  PalletMembershipEvent,
  PalletMultisigCall,
  PalletMultisigError,
  PalletMultisigEvent,
  PalletMultisigMultisig,
  PalletMultisigTimepoint,
  PalletOffencesEvent,
  PalletOneshotAccountAccount,
  PalletOneshotAccountCall,
  PalletOneshotAccountCheckNonce,
  PalletOneshotAccountError,
  PalletOneshotAccountEvent,
  PalletPreimageCall,
  PalletPreimageError,
  PalletPreimageEvent,
  PalletPreimageRequestStatus,
  PalletProvideRandomnessCall,
  PalletProvideRandomnessError,
  PalletProvideRandomnessEvent,
  PalletProvideRandomnessRandomnessType,
  PalletProvideRandomnessRequest,
  PalletProxyAnnouncement,
  PalletProxyCall,
  PalletProxyError,
  PalletProxyEvent,
  PalletProxyProxyDefinition,
  PalletQuotaEvent,
  PalletQuotaQuota,
  PalletQuotaRefund,
  PalletSchedulerCall,
  PalletSchedulerError,
  PalletSchedulerEvent,
  PalletSchedulerScheduled,
  PalletSessionCall,
  PalletSessionError,
  PalletSessionEvent,
  PalletSudoCall,
  PalletSudoError,
  PalletSudoEvent,
  PalletTimestampCall,
  PalletTransactionPaymentChargeTransactionPayment,
  PalletTransactionPaymentEvent,
  PalletTransactionPaymentReleases,
  PalletTreasuryCall,
  PalletTreasuryError,
  PalletTreasuryEvent,
  PalletTreasuryProposal,
  PalletUniversalDividendCall,
  PalletUniversalDividendError,
  PalletUniversalDividendEvent,
  PalletUpgradeOriginCall,
  PalletUpgradeOriginEvent,
  PalletUtilityCall,
  PalletUtilityError,
  PalletUtilityEvent,
  SpArithmeticArithmeticError,
  SpAuthorityDiscoveryAppPublic,
  SpConsensusBabeAllowedSlots,
  SpConsensusBabeAppPublic,
  SpConsensusBabeBabeEpochConfiguration,
  SpConsensusBabeDigestsNextConfigDescriptor,
  SpConsensusBabeDigestsPreDigest,
  SpConsensusBabeDigestsPrimaryPreDigest,
  SpConsensusBabeDigestsSecondaryPlainPreDigest,
  SpConsensusBabeDigestsSecondaryVRFPreDigest,
  SpConsensusGrandpaAppPublic,
  SpConsensusGrandpaAppSignature,
  SpConsensusGrandpaEquivocation,
  SpConsensusGrandpaEquivocationProof,
  SpConsensusSlotsEquivocationProof,
  SpCoreCryptoKeyTypeId,
  SpCoreEcdsaSignature,
  SpCoreEd25519Public,
  SpCoreEd25519Signature,
  SpCoreOffchainOpaqueNetworkState,
  SpCoreSr25519Public,
  SpCoreSr25519Signature,
  SpCoreSr25519VrfVrfSignature,
  SpCoreVoid,
  SpDistanceComputationResult,
  SpMembershipMembershipData,
  SpRuntimeBlakeTwo256,
  SpRuntimeDigest,
  SpRuntimeDigestDigestItem,
  SpRuntimeDispatchError,
  SpRuntimeHeader,
  SpRuntimeModuleError,
  SpRuntimeMultiSignature,
  SpRuntimeTokenError,
  SpRuntimeTransactionalError,
  SpSessionMembershipProof,
  SpStakingOffenceOffenceDetails,
  SpVersionRuntimeVersion,
  SpWeightsRuntimeDbWeight,
  SpWeightsWeightV2Weight,
} from '@polkadot/types/lookup';

declare module '@polkadot/types/types/registry' {
  interface InterfaceTypes {
    CommonRuntimeEntitiesIdtyData: CommonRuntimeEntitiesIdtyData;
    CommonRuntimeEntitiesValidatorFullIdentification: CommonRuntimeEntitiesValidatorFullIdentification;
    FinalityGrandpaEquivocationPrecommit: FinalityGrandpaEquivocationPrecommit;
    FinalityGrandpaEquivocationPrevote: FinalityGrandpaEquivocationPrevote;
    FinalityGrandpaPrecommit: FinalityGrandpaPrecommit;
    FinalityGrandpaPrevote: FinalityGrandpaPrevote;
    FrameSupportDispatchDispatchClass: FrameSupportDispatchDispatchClass;
    FrameSupportDispatchDispatchInfo: FrameSupportDispatchDispatchInfo;
    FrameSupportDispatchPays: FrameSupportDispatchPays;
    FrameSupportDispatchPerDispatchClassU32: FrameSupportDispatchPerDispatchClassU32;
    FrameSupportDispatchPerDispatchClassWeight: FrameSupportDispatchPerDispatchClassWeight;
    FrameSupportDispatchPerDispatchClassWeightsPerClass: FrameSupportDispatchPerDispatchClassWeightsPerClass;
    FrameSupportDispatchRawOrigin: FrameSupportDispatchRawOrigin;
    FrameSupportPalletId: FrameSupportPalletId;
    FrameSupportPreimagesBounded: FrameSupportPreimagesBounded;
    FrameSupportTokensMiscBalanceStatus: FrameSupportTokensMiscBalanceStatus;
    FrameSystemAccountInfo: FrameSystemAccountInfo;
    FrameSystemCall: FrameSystemCall;
    FrameSystemError: FrameSystemError;
    FrameSystemEvent: FrameSystemEvent;
    FrameSystemEventRecord: FrameSystemEventRecord;
    FrameSystemExtensionsCheckGenesis: FrameSystemExtensionsCheckGenesis;
    FrameSystemExtensionsCheckNonZeroSender: FrameSystemExtensionsCheckNonZeroSender;
    FrameSystemExtensionsCheckNonce: FrameSystemExtensionsCheckNonce;
    FrameSystemExtensionsCheckSpecVersion: FrameSystemExtensionsCheckSpecVersion;
    FrameSystemExtensionsCheckTxVersion: FrameSystemExtensionsCheckTxVersion;
    FrameSystemExtensionsCheckWeight: FrameSystemExtensionsCheckWeight;
    FrameSystemLastRuntimeUpgradeInfo: FrameSystemLastRuntimeUpgradeInfo;
    FrameSystemLimitsBlockLength: FrameSystemLimitsBlockLength;
    FrameSystemLimitsBlockWeights: FrameSystemLimitsBlockWeights;
    FrameSystemLimitsWeightsPerClass: FrameSystemLimitsWeightsPerClass;
    FrameSystemPhase: FrameSystemPhase;
    GdevRuntimeOpaqueSessionKeys: GdevRuntimeOpaqueSessionKeys;
    GdevRuntimeOriginCaller: GdevRuntimeOriginCaller;
    GdevRuntimeProxyType: GdevRuntimeProxyType;
    GdevRuntimeRuntime: GdevRuntimeRuntime;
    PalletAtomicSwapBalanceSwapAction: PalletAtomicSwapBalanceSwapAction;
    PalletAtomicSwapCall: PalletAtomicSwapCall;
    PalletAtomicSwapError: PalletAtomicSwapError;
    PalletAtomicSwapEvent: PalletAtomicSwapEvent;
    PalletAtomicSwapPendingSwap: PalletAtomicSwapPendingSwap;
    PalletAuthorityMembersCall: PalletAuthorityMembersCall;
    PalletAuthorityMembersError: PalletAuthorityMembersError;
    PalletAuthorityMembersEvent: PalletAuthorityMembersEvent;
    PalletAuthorityMembersMemberData: PalletAuthorityMembersMemberData;
    PalletBabeCall: PalletBabeCall;
    PalletBabeError: PalletBabeError;
    PalletBalancesAccountData: PalletBalancesAccountData;
    PalletBalancesBalanceLock: PalletBalancesBalanceLock;
    PalletBalancesCall: PalletBalancesCall;
    PalletBalancesError: PalletBalancesError;
    PalletBalancesEvent: PalletBalancesEvent;
    PalletBalancesIdAmount: PalletBalancesIdAmount;
    PalletBalancesReasons: PalletBalancesReasons;
    PalletBalancesReserveData: PalletBalancesReserveData;
    PalletCertificationCall: PalletCertificationCall;
    PalletCertificationError: PalletCertificationError;
    PalletCertificationEvent: PalletCertificationEvent;
    PalletCertificationIdtyCertMeta: PalletCertificationIdtyCertMeta;
    PalletCollectiveCall: PalletCollectiveCall;
    PalletCollectiveError: PalletCollectiveError;
    PalletCollectiveEvent: PalletCollectiveEvent;
    PalletCollectiveRawOrigin: PalletCollectiveRawOrigin;
    PalletCollectiveVotes: PalletCollectiveVotes;
    PalletDistanceCall: PalletDistanceCall;
    PalletDistanceDistanceStatus: PalletDistanceDistanceStatus;
    PalletDistanceError: PalletDistanceError;
    PalletDistanceEvaluationPool: PalletDistanceEvaluationPool;
    PalletDistanceMedianMedianAcc: PalletDistanceMedianMedianAcc;
    PalletDuniterAccountAccountData: PalletDuniterAccountAccountData;
    PalletDuniterAccountCall: PalletDuniterAccountCall;
    PalletDuniterAccountEvent: PalletDuniterAccountEvent;
    PalletDuniterTestParametersParameters: PalletDuniterTestParametersParameters;
    PalletDuniterWotError: PalletDuniterWotError;
    PalletDuniterWotIdtyRemovalWotReason: PalletDuniterWotIdtyRemovalWotReason;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletIdentityCall: PalletIdentityCall;
    PalletIdentityError: PalletIdentityError;
    PalletIdentityEvent: PalletIdentityEvent;
    PalletIdentityIdtyRemovalReason: PalletIdentityIdtyRemovalReason;
    PalletIdentityIdtyStatus: PalletIdentityIdtyStatus;
    PalletIdentityIdtyValue: PalletIdentityIdtyValue;
    PalletImOnlineBoundedOpaqueNetworkState: PalletImOnlineBoundedOpaqueNetworkState;
    PalletImOnlineCall: PalletImOnlineCall;
    PalletImOnlineError: PalletImOnlineError;
    PalletImOnlineEvent: PalletImOnlineEvent;
    PalletImOnlineHeartbeat: PalletImOnlineHeartbeat;
    PalletImOnlineSr25519AppSr25519Public: PalletImOnlineSr25519AppSr25519Public;
    PalletImOnlineSr25519AppSr25519Signature: PalletImOnlineSr25519AppSr25519Signature;
    PalletMembershipCall: PalletMembershipCall;
    PalletMembershipError: PalletMembershipError;
    PalletMembershipEvent: PalletMembershipEvent;
    PalletMultisigCall: PalletMultisigCall;
    PalletMultisigError: PalletMultisigError;
    PalletMultisigEvent: PalletMultisigEvent;
    PalletMultisigMultisig: PalletMultisigMultisig;
    PalletMultisigTimepoint: PalletMultisigTimepoint;
    PalletOffencesEvent: PalletOffencesEvent;
    PalletOneshotAccountAccount: PalletOneshotAccountAccount;
    PalletOneshotAccountCall: PalletOneshotAccountCall;
    PalletOneshotAccountCheckNonce: PalletOneshotAccountCheckNonce;
    PalletOneshotAccountError: PalletOneshotAccountError;
    PalletOneshotAccountEvent: PalletOneshotAccountEvent;
    PalletPreimageCall: PalletPreimageCall;
    PalletPreimageError: PalletPreimageError;
    PalletPreimageEvent: PalletPreimageEvent;
    PalletPreimageRequestStatus: PalletPreimageRequestStatus;
    PalletProvideRandomnessCall: PalletProvideRandomnessCall;
    PalletProvideRandomnessError: PalletProvideRandomnessError;
    PalletProvideRandomnessEvent: PalletProvideRandomnessEvent;
    PalletProvideRandomnessRandomnessType: PalletProvideRandomnessRandomnessType;
    PalletProvideRandomnessRequest: PalletProvideRandomnessRequest;
    PalletProxyAnnouncement: PalletProxyAnnouncement;
    PalletProxyCall: PalletProxyCall;
    PalletProxyError: PalletProxyError;
    PalletProxyEvent: PalletProxyEvent;
    PalletProxyProxyDefinition: PalletProxyProxyDefinition;
    PalletQuotaEvent: PalletQuotaEvent;
    PalletQuotaQuota: PalletQuotaQuota;
    PalletQuotaRefund: PalletQuotaRefund;
    PalletSchedulerCall: PalletSchedulerCall;
    PalletSchedulerError: PalletSchedulerError;
    PalletSchedulerEvent: PalletSchedulerEvent;
    PalletSchedulerScheduled: PalletSchedulerScheduled;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletSudoCall: PalletSudoCall;
    PalletSudoError: PalletSudoError;
    PalletSudoEvent: PalletSudoEvent;
    PalletTimestampCall: PalletTimestampCall;
    PalletTransactionPaymentChargeTransactionPayment: PalletTransactionPaymentChargeTransactionPayment;
    PalletTransactionPaymentEvent: PalletTransactionPaymentEvent;
    PalletTransactionPaymentReleases: PalletTransactionPaymentReleases;
    PalletTreasuryCall: PalletTreasuryCall;
    PalletTreasuryError: PalletTreasuryError;
    PalletTreasuryEvent: PalletTreasuryEvent;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletUniversalDividendCall: PalletUniversalDividendCall;
    PalletUniversalDividendError: PalletUniversalDividendError;
    PalletUniversalDividendEvent: PalletUniversalDividendEvent;
    PalletUpgradeOriginCall: PalletUpgradeOriginCall;
    PalletUpgradeOriginEvent: PalletUpgradeOriginEvent;
    PalletUtilityCall: PalletUtilityCall;
    PalletUtilityError: PalletUtilityError;
    PalletUtilityEvent: PalletUtilityEvent;
    SpArithmeticArithmeticError: SpArithmeticArithmeticError;
    SpAuthorityDiscoveryAppPublic: SpAuthorityDiscoveryAppPublic;
    SpConsensusBabeAllowedSlots: SpConsensusBabeAllowedSlots;
    SpConsensusBabeAppPublic: SpConsensusBabeAppPublic;
    SpConsensusBabeBabeEpochConfiguration: SpConsensusBabeBabeEpochConfiguration;
    SpConsensusBabeDigestsNextConfigDescriptor: SpConsensusBabeDigestsNextConfigDescriptor;
    SpConsensusBabeDigestsPreDigest: SpConsensusBabeDigestsPreDigest;
    SpConsensusBabeDigestsPrimaryPreDigest: SpConsensusBabeDigestsPrimaryPreDigest;
    SpConsensusBabeDigestsSecondaryPlainPreDigest: SpConsensusBabeDigestsSecondaryPlainPreDigest;
    SpConsensusBabeDigestsSecondaryVRFPreDigest: SpConsensusBabeDigestsSecondaryVRFPreDigest;
    SpConsensusGrandpaAppPublic: SpConsensusGrandpaAppPublic;
    SpConsensusGrandpaAppSignature: SpConsensusGrandpaAppSignature;
    SpConsensusGrandpaEquivocation: SpConsensusGrandpaEquivocation;
    SpConsensusGrandpaEquivocationProof: SpConsensusGrandpaEquivocationProof;
    SpConsensusSlotsEquivocationProof: SpConsensusSlotsEquivocationProof;
    SpCoreCryptoKeyTypeId: SpCoreCryptoKeyTypeId;
    SpCoreEcdsaSignature: SpCoreEcdsaSignature;
    SpCoreEd25519Public: SpCoreEd25519Public;
    SpCoreEd25519Signature: SpCoreEd25519Signature;
    SpCoreOffchainOpaqueNetworkState: SpCoreOffchainOpaqueNetworkState;
    SpCoreSr25519Public: SpCoreSr25519Public;
    SpCoreSr25519Signature: SpCoreSr25519Signature;
    SpCoreSr25519VrfVrfSignature: SpCoreSr25519VrfVrfSignature;
    SpCoreVoid: SpCoreVoid;
    SpDistanceComputationResult: SpDistanceComputationResult;
    SpMembershipMembershipData: SpMembershipMembershipData;
    SpRuntimeBlakeTwo256: SpRuntimeBlakeTwo256;
    SpRuntimeDigest: SpRuntimeDigest;
    SpRuntimeDigestDigestItem: SpRuntimeDigestDigestItem;
    SpRuntimeDispatchError: SpRuntimeDispatchError;
    SpRuntimeHeader: SpRuntimeHeader;
    SpRuntimeModuleError: SpRuntimeModuleError;
    SpRuntimeMultiSignature: SpRuntimeMultiSignature;
    SpRuntimeTokenError: SpRuntimeTokenError;
    SpRuntimeTransactionalError: SpRuntimeTransactionalError;
    SpSessionMembershipProof: SpSessionMembershipProof;
    SpStakingOffenceOffenceDetails: SpStakingOffenceOffenceDetails;
    SpVersionRuntimeVersion: SpVersionRuntimeVersion;
    SpWeightsRuntimeDbWeight: SpWeightsRuntimeDbWeight;
    SpWeightsWeightV2Weight: SpWeightsWeightV2Weight;
  } // InterfaceTypes
} // declare module
