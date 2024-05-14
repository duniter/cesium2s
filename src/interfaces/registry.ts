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
  FrameSystemCodeUpgradeAuthorization,
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
  PalletBalancesAdjustmentDirection,
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
  PalletDistanceError,
  PalletDistanceEvaluationPool,
  PalletDistanceEvent,
  PalletDistanceMedianMedianAcc,
  PalletDuniterAccountAccountData,
  PalletDuniterAccountCall,
  PalletDuniterAccountEvent,
  PalletDuniterTestParametersParameters,
  PalletDuniterWotError,
  PalletGrandpaCall,
  PalletGrandpaError,
  PalletGrandpaEvent,
  PalletGrandpaStoredPendingChange,
  PalletGrandpaStoredState,
  PalletIdentityCall,
  PalletIdentityError,
  PalletIdentityEvent,
  PalletIdentityIdtyStatus,
  PalletIdentityIdtyValue,
  PalletIdentityRemovalReason,
  PalletIdentityRevocationReason,
  PalletImOnlineCall,
  PalletImOnlineError,
  PalletImOnlineEvent,
  PalletImOnlineHeartbeat,
  PalletImOnlineSr25519AppSr25519Public,
  PalletImOnlineSr25519AppSr25519Signature,
  PalletMembershipError,
  PalletMembershipEvent,
  PalletMembershipMembershipRemovalReason,
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
  PalletPreimageOldRequestStatus,
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
  PalletSchedulerRetryConfig,
  PalletSchedulerScheduled,
  PalletSessionCall,
  PalletSessionError,
  PalletSessionEvent,
  PalletSmithMembersCall,
  PalletSmithMembersError,
  PalletSmithMembersEvent,
  PalletSmithMembersSmithMeta,
  PalletSmithMembersSmithStatus,
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
  PalletTreasuryPaymentState,
  PalletTreasuryProposal,
  PalletTreasurySpendStatus,
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
    FrameSystemCodeUpgradeAuthorization: FrameSystemCodeUpgradeAuthorization;
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
    PalletBalancesAdjustmentDirection: PalletBalancesAdjustmentDirection;
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
    PalletDistanceError: PalletDistanceError;
    PalletDistanceEvaluationPool: PalletDistanceEvaluationPool;
    PalletDistanceEvent: PalletDistanceEvent;
    PalletDistanceMedianMedianAcc: PalletDistanceMedianMedianAcc;
    PalletDuniterAccountAccountData: PalletDuniterAccountAccountData;
    PalletDuniterAccountCall: PalletDuniterAccountCall;
    PalletDuniterAccountEvent: PalletDuniterAccountEvent;
    PalletDuniterTestParametersParameters: PalletDuniterTestParametersParameters;
    PalletDuniterWotError: PalletDuniterWotError;
    PalletGrandpaCall: PalletGrandpaCall;
    PalletGrandpaError: PalletGrandpaError;
    PalletGrandpaEvent: PalletGrandpaEvent;
    PalletGrandpaStoredPendingChange: PalletGrandpaStoredPendingChange;
    PalletGrandpaStoredState: PalletGrandpaStoredState;
    PalletIdentityCall: PalletIdentityCall;
    PalletIdentityError: PalletIdentityError;
    PalletIdentityEvent: PalletIdentityEvent;
    PalletIdentityIdtyStatus: PalletIdentityIdtyStatus;
    PalletIdentityIdtyValue: PalletIdentityIdtyValue;
    PalletIdentityRemovalReason: PalletIdentityRemovalReason;
    PalletIdentityRevocationReason: PalletIdentityRevocationReason;
    PalletImOnlineCall: PalletImOnlineCall;
    PalletImOnlineError: PalletImOnlineError;
    PalletImOnlineEvent: PalletImOnlineEvent;
    PalletImOnlineHeartbeat: PalletImOnlineHeartbeat;
    PalletImOnlineSr25519AppSr25519Public: PalletImOnlineSr25519AppSr25519Public;
    PalletImOnlineSr25519AppSr25519Signature: PalletImOnlineSr25519AppSr25519Signature;
    PalletMembershipError: PalletMembershipError;
    PalletMembershipEvent: PalletMembershipEvent;
    PalletMembershipMembershipRemovalReason: PalletMembershipMembershipRemovalReason;
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
    PalletPreimageOldRequestStatus: PalletPreimageOldRequestStatus;
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
    PalletSchedulerRetryConfig: PalletSchedulerRetryConfig;
    PalletSchedulerScheduled: PalletSchedulerScheduled;
    PalletSessionCall: PalletSessionCall;
    PalletSessionError: PalletSessionError;
    PalletSessionEvent: PalletSessionEvent;
    PalletSmithMembersCall: PalletSmithMembersCall;
    PalletSmithMembersError: PalletSmithMembersError;
    PalletSmithMembersEvent: PalletSmithMembersEvent;
    PalletSmithMembersSmithMeta: PalletSmithMembersSmithMeta;
    PalletSmithMembersSmithStatus: PalletSmithMembersSmithStatus;
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
    PalletTreasuryPaymentState: PalletTreasuryPaymentState;
    PalletTreasuryProposal: PalletTreasuryProposal;
    PalletTreasurySpendStatus: PalletTreasurySpendStatus;
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
