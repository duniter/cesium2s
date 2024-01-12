// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_duniter_account::types::AccountData<Balance, IdtyId>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletDuniterAccountAccountData',
  },
  /**
   * Lookup5: pallet_duniter_account::types::AccountData<Balance, IdtyId>
   **/
  PalletDuniterAccountAccountData: {
    randomId: 'Option<H256>',
    free: 'u64',
    reserved: 'u64',
    feeFrozen: 'u64',
    linkedIdty: 'Option<u32>',
  },
  /**
   * Lookup10: frame_support::dispatch::PerDispatchClass<sp_weights::weight_v2::Weight>
   **/
  FrameSupportDispatchPerDispatchClassWeight: {
    normal: 'SpWeightsWeightV2Weight',
    operational: 'SpWeightsWeightV2Weight',
    mandatory: 'SpWeightsWeightV2Weight',
  },
  /**
   * Lookup11: sp_weights::weight_v2::Weight
   **/
  SpWeightsWeightV2Weight: {
    refTime: 'Compact<u64>',
    proofSize: 'Compact<u64>',
  },
  /**
   * Lookup14: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>',
  },
  /**
   * Lookup16: sp_runtime::generic::digest::DigestItem
   **/
  SpRuntimeDigestDigestItem: {
    _enum: {
      Other: 'Bytes',
      __Unused1: 'Null',
      __Unused2: 'Null',
      __Unused3: 'Null',
      Consensus: '([u8;4],Bytes)',
      Seal: '([u8;4],Bytes)',
      PreRuntime: '([u8;4],Bytes)',
      __Unused7: 'Null',
      RuntimeEnvironmentUpdated: 'Null',
    },
  },
  /**
   * Lookup19: frame_system::EventRecord<gdev_runtime::RuntimeEvent, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>',
  },
  /**
   * Lookup21: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportDispatchDispatchInfo',
      },
      CodeUpdated: 'Null',
      NewAccount: {
        account: 'AccountId32',
      },
      KilledAccount: {
        account: 'AccountId32',
      },
      Remarked: {
        _alias: {
          hash_: 'hash',
        },
        sender: 'AccountId32',
        hash_: 'H256',
      },
    },
  },
  /**
   * Lookup22: frame_support::dispatch::DispatchInfo
   **/
  FrameSupportDispatchDispatchInfo: {
    weight: 'SpWeightsWeightV2Weight',
    class: 'FrameSupportDispatchDispatchClass',
    paysFee: 'FrameSupportDispatchPays',
  },
  /**
   * Lookup23: frame_support::dispatch::DispatchClass
   **/
  FrameSupportDispatchDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory'],
  },
  /**
   * Lookup24: frame_support::dispatch::Pays
   **/
  FrameSupportDispatchPays: {
    _enum: ['Yes', 'No'],
  },
  /**
   * Lookup25: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: 'SpRuntimeModuleError',
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpArithmeticArithmeticError',
      Transactional: 'SpRuntimeTransactionalError',
      Exhausted: 'Null',
      Corruption: 'Null',
      Unavailable: 'Null',
    },
  },
  /**
   * Lookup26: sp_runtime::ModuleError
   **/
  SpRuntimeModuleError: {
    index: 'u8',
    error: '[u8;4]',
  },
  /**
   * Lookup27: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: [
      'FundsUnavailable',
      'OnlyProvider',
      'BelowMinimum',
      'CannotCreate',
      'UnknownAsset',
      'Frozen',
      'Unsupported',
      'CannotCreateHold',
      'NotExpendable',
    ],
  },
  /**
   * Lookup28: sp_arithmetic::ArithmeticError
   **/
  SpArithmeticArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero'],
  },
  /**
   * Lookup29: sp_runtime::TransactionalError
   **/
  SpRuntimeTransactionalError: {
    _enum: ['LimitReached', 'NoLayer'],
  },
  /**
   * Lookup30: pallet_duniter_account::pallet::Event<T>
   **/
  PalletDuniterAccountEvent: {
    _enum: {
      ForceDestroy: {
        who: 'AccountId32',
        balance: 'u64',
      },
      RandomIdAssigned: {
        who: 'AccountId32',
        randomId: 'H256',
      },
      AccountLinked: {
        who: 'AccountId32',
        identity: 'u32',
      },
      AccountUnlinked: 'AccountId32',
    },
  },
  /**
   * Lookup31: pallet_scheduler::pallet::Event<T>
   **/
  PalletSchedulerEvent: {
    _enum: {
      Scheduled: {
        when: 'u32',
        index: 'u32',
      },
      Canceled: {
        when: 'u32',
        index: 'u32',
      },
      Dispatched: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallUnavailable: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PeriodicFailed: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
      PermanentlyOverweight: {
        task: '(u32,u32)',
        id: 'Option<[u8;32]>',
      },
    },
  },
  /**
   * Lookup36: pallet_balances::pallet::Event<T, I>
   **/
  PalletBalancesEvent: {
    _enum: {
      Endowed: {
        account: 'AccountId32',
        freeBalance: 'u64',
      },
      DustLost: {
        account: 'AccountId32',
        amount: 'u64',
      },
      Transfer: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u64',
      },
      BalanceSet: {
        who: 'AccountId32',
        free: 'u64',
      },
      Reserved: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Unreserved: {
        who: 'AccountId32',
        amount: 'u64',
      },
      ReserveRepatriated: {
        from: 'AccountId32',
        to: 'AccountId32',
        amount: 'u64',
        destinationStatus: 'FrameSupportTokensMiscBalanceStatus',
      },
      Deposit: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Withdraw: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Slashed: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Minted: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Burned: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Suspended: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Restored: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Upgraded: {
        who: 'AccountId32',
      },
      Issued: {
        amount: 'u64',
      },
      Rescinded: {
        amount: 'u64',
      },
      Locked: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Unlocked: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Frozen: {
        who: 'AccountId32',
        amount: 'u64',
      },
      Thawed: {
        who: 'AccountId32',
        amount: 'u64',
      },
    },
  },
  /**
   * Lookup37: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved'],
  },
  /**
   * Lookup38: pallet_transaction_payment::pallet::Event<T>
   **/
  PalletTransactionPaymentEvent: {
    _enum: {
      TransactionFeePaid: {
        who: 'AccountId32',
        actualFee: 'u64',
        tip: 'u64',
      },
    },
  },
  /**
   * Lookup39: pallet_oneshot_account::pallet::Event<T>
   **/
  PalletOneshotAccountEvent: {
    _enum: {
      OneshotAccountCreated: {
        account: 'AccountId32',
        balance: 'u64',
        creator: 'AccountId32',
      },
      OneshotAccountConsumed: {
        account: 'AccountId32',
        dest1: '(AccountId32,u64)',
        dest2: 'Option<(AccountId32,u64)>',
      },
      Withdraw: {
        account: 'AccountId32',
        balance: 'u64',
      },
    },
  },
  /**
   * Lookup42: pallet_quota::pallet::Event<T>
   **/
  PalletQuotaEvent: {
    _enum: {
      Refunded: {
        who: 'AccountId32',
        identity: 'u32',
        amount: 'u64',
      },
      NoQuotaForIdty: 'u32',
      NoMoreCurrencyForRefund: 'Null',
      RefundFailed: 'AccountId32',
      RefundQueueFull: 'Null',
    },
  },
  /**
   * Lookup43: pallet_authority_members::pallet::Event<T>
   **/
  PalletAuthorityMembersEvent: {
    _enum: {
      IncomingAuthorities: 'Vec<u32>',
      OutgoingAuthorities: 'Vec<u32>',
      MemberGoOffline: 'u32',
      MemberGoOnline: 'u32',
      MemberRemoved: 'u32',
      MemberRemovedFromBlackList: 'u32',
    },
  },
  /**
   * Lookup45: pallet_offences::pallet::Event
   **/
  PalletOffencesEvent: {
    _enum: {
      Offence: {
        kind: '[u8;16]',
        timeslot: 'Bytes',
      },
    },
  },
  /**
   * Lookup47: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32',
      },
    },
  },
  /**
   * Lookup48: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null',
    },
  },
  /**
   * Lookup51: sp_consensus_grandpa::app::Public
   **/
  SpConsensusGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup52: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup53: pallet_im_online::pallet::Event<T>
   **/
  PalletImOnlineEvent: {
    _enum: {
      HeartbeatReceived: {
        authorityId: 'PalletImOnlineSr25519AppSr25519Public',
      },
      AllGood: 'Null',
      SomeOffline: {
        offline: 'Vec<(AccountId32,CommonRuntimeEntitiesValidatorFullIdentification)>',
      },
    },
  },
  /**
   * Lookup54: pallet_im_online::sr25519::app_sr25519::Public
   **/
  PalletImOnlineSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup55: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup58: common_runtime::entities::ValidatorFullIdentification
   **/
  CommonRuntimeEntitiesValidatorFullIdentification: 'Null',
  /**
   * Lookup59: pallet_sudo::pallet::Event<T>
   **/
  PalletSudoEvent: {
    _enum: {
      Sudid: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
      KeyChanged: {
        oldSudoer: 'Option<AccountId32>',
      },
      SudoAsDone: {
        sudoResult: 'Result<Null, SpRuntimeDispatchError>',
      },
    },
  },
  /**
   * Lookup61: pallet_upgrade_origin::pallet::Event
   **/
  PalletUpgradeOriginEvent: {
    _enum: {
      DispatchedAsRoot: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
    },
  },
  /**
   * Lookup62: pallet_preimage::pallet::Event<T>
   **/
  PalletPreimageEvent: {
    _enum: {
      Noted: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Requested: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Cleared: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
    },
  },
  /**
   * Lookup63: pallet_collective::pallet::Event<T, I>
   **/
  PalletCollectiveEvent: {
    _enum: {
      Proposed: {
        account: 'AccountId32',
        proposalIndex: 'u32',
        proposalHash: 'H256',
        threshold: 'u32',
      },
      Voted: {
        account: 'AccountId32',
        proposalHash: 'H256',
        voted: 'bool',
        yes: 'u32',
        no: 'u32',
      },
      Approved: {
        proposalHash: 'H256',
      },
      Disapproved: {
        proposalHash: 'H256',
      },
      Executed: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MemberExecuted: {
        proposalHash: 'H256',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      Closed: {
        proposalHash: 'H256',
        yes: 'u32',
        no: 'u32',
      },
    },
  },
  /**
   * Lookup65: pallet_universal_dividend::pallet::Event<T>
   **/
  PalletUniversalDividendEvent: {
    _enum: {
      NewUdCreated: {
        amount: 'u64',
        index: 'u16',
        monetaryMass: 'u64',
        membersCount: 'u64',
      },
      UdReevalued: {
        newUdAmount: 'u64',
        monetaryMass: 'u64',
        membersCount: 'u64',
      },
      UdsAutoPaidAtRemoval: {
        count: 'u16',
        total: 'u64',
        who: 'AccountId32',
      },
      UdsClaimed: {
        count: 'u16',
        total: 'u64',
        who: 'AccountId32',
      },
    },
  },
  /**
   * Lookup67: pallet_identity::pallet::Event<T>
   **/
  PalletIdentityEvent: {
    _enum: {
      IdtyCreated: {
        idtyIndex: 'u32',
        ownerKey: 'AccountId32',
      },
      IdtyConfirmed: {
        idtyIndex: 'u32',
        ownerKey: 'AccountId32',
        name: 'Text',
      },
      IdtyValidated: {
        idtyIndex: 'u32',
      },
      IdtyChangedOwnerKey: {
        idtyIndex: 'u32',
        newOwnerKey: 'AccountId32',
      },
      IdtyRemoved: {
        idtyIndex: 'u32',
        reason: 'PalletIdentityIdtyRemovalReason',
      },
    },
  },
  /**
   * Lookup69: pallet_identity::types::IdtyRemovalReason<pallet_duniter_wot::types::IdtyRemovalWotReason>
   **/
  PalletIdentityIdtyRemovalReason: {
    _enum: {
      Expired: 'Null',
      Manual: 'Null',
      Other: 'PalletDuniterWotIdtyRemovalWotReason',
      Revoked: 'Null',
    },
  },
  /**
   * Lookup70: pallet_duniter_wot::types::IdtyRemovalWotReason
   **/
  PalletDuniterWotIdtyRemovalWotReason: {
    _enum: ['MembershipExpired', 'Other'],
  },
  /**
   * Lookup71: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: {
      MembershipAcquired: 'u32',
      MembershipExpired: 'u32',
      MembershipRenewed: 'u32',
      MembershipRequested: 'u32',
      MembershipRevoked: 'u32',
      PendingMembershipExpired: 'u32',
    },
  },
  /**
   * Lookup72: pallet_certification::pallet::Event<T, I>
   **/
  PalletCertificationEvent: {
    _enum: {
      NewCert: {
        issuer: 'u32',
        issuerIssuedCount: 'u32',
        receiver: 'u32',
        receiverReceivedCount: 'u32',
      },
      RemovedCert: {
        issuer: 'u32',
        issuerIssuedCount: 'u32',
        receiver: 'u32',
        receiverReceivedCount: 'u32',
        expiration: 'bool',
      },
      RenewedCert: {
        issuer: 'u32',
        receiver: 'u32',
      },
    },
  },
  /**
   * Lookup75: pallet_atomic_swap::pallet::Event<T>
   **/
  PalletAtomicSwapEvent: {
    _enum: {
      NewSwap: {
        account: 'AccountId32',
        proof: '[u8;32]',
        swap: 'PalletAtomicSwapPendingSwap',
      },
      SwapClaimed: {
        account: 'AccountId32',
        proof: '[u8;32]',
        success: 'bool',
      },
      SwapCancelled: {
        account: 'AccountId32',
        proof: '[u8;32]',
      },
    },
  },
  /**
   * Lookup76: pallet_atomic_swap::PendingSwap<T>
   **/
  PalletAtomicSwapPendingSwap: {
    source: 'AccountId32',
    action: 'PalletAtomicSwapBalanceSwapAction',
    endBlock: 'u32',
  },
  /**
   * Lookup77: pallet_atomic_swap::BalanceSwapAction<sp_core::crypto::AccountId32, C>
   **/
  PalletAtomicSwapBalanceSwapAction: {
    value: 'u64',
  },
  /**
   * Lookup78: pallet_multisig::pallet::Event<T>
   **/
  PalletMultisigEvent: {
    _enum: {
      NewMultisig: {
        approving: 'AccountId32',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigApproval: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
      MultisigExecuted: {
        approving: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      MultisigCancelled: {
        cancelling: 'AccountId32',
        timepoint: 'PalletMultisigTimepoint',
        multisig: 'AccountId32',
        callHash: '[u8;32]',
      },
    },
  },
  /**
   * Lookup79: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32',
  },
  /**
   * Lookup80: pallet_provide_randomness::pallet::Event
   **/
  PalletProvideRandomnessEvent: {
    _enum: {
      FilledRandomness: {
        requestId: 'u64',
        randomness: 'H256',
      },
      RequestedRandomness: {
        _alias: {
          r_type: 'r#type',
        },
        requestId: 'u64',
        salt: 'H256',
        r_type: 'PalletProvideRandomnessRandomnessType',
      },
    },
  },
  /**
   * Lookup81: pallet_provide_randomness::types::RandomnessType
   **/
  PalletProvideRandomnessRandomnessType: {
    _enum: ['RandomnessFromPreviousBlock', 'RandomnessFromOneEpochAgo', 'RandomnessFromTwoEpochsAgo'],
  },
  /**
   * Lookup82: pallet_proxy::pallet::Event<T>
   **/
  PalletProxyEvent: {
    _enum: {
      ProxyExecuted: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      PureCreated: {
        pure: 'AccountId32',
        who: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        disambiguationIndex: 'u16',
      },
      Announced: {
        real: 'AccountId32',
        proxy: 'AccountId32',
        callHash: 'H256',
      },
      ProxyAdded: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      ProxyRemoved: {
        delegator: 'AccountId32',
        delegatee: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
    },
  },
  /**
   * Lookup83: gdev_runtime::ProxyType
   **/
  GdevRuntimeProxyType: {
    _enum: ['AlmostAny', 'TransferOnly', 'CancelProxy', 'TechnicalCommitteePropose'],
  },
  /**
   * Lookup84: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      BatchCompletedWithErrors: 'Null',
      ItemCompleted: 'Null',
      ItemFailed: {
        error: 'SpRuntimeDispatchError',
      },
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
    },
  },
  /**
   * Lookup85: pallet_treasury::pallet::Event<T, I>
   **/
  PalletTreasuryEvent: {
    _enum: {
      Proposed: {
        proposalIndex: 'u32',
      },
      Spending: {
        budgetRemaining: 'u64',
      },
      Awarded: {
        proposalIndex: 'u32',
        award: 'u64',
        account: 'AccountId32',
      },
      Rejected: {
        proposalIndex: 'u32',
        slashed: 'u64',
      },
      Burnt: {
        burntFunds: 'u64',
      },
      Rollover: {
        rolloverBalance: 'u64',
      },
      Deposit: {
        value: 'u64',
      },
      SpendApproved: {
        proposalIndex: 'u32',
        amount: 'u64',
        beneficiary: 'AccountId32',
      },
      UpdatedInactive: {
        reactivated: 'u64',
        deactivated: 'u64',
      },
    },
  },
  /**
   * Lookup86: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null',
    },
  },
  /**
   * Lookup89: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text',
  },
  /**
   * Lookup91: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      remark: {
        remark: 'Bytes',
      },
      set_heap_pages: {
        pages: 'u64',
      },
      set_code: {
        code: 'Bytes',
      },
      set_code_without_checks: {
        code: 'Bytes',
      },
      set_storage: {
        items: 'Vec<(Bytes,Bytes)>',
      },
      kill_storage: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'Vec<Bytes>',
      },
      kill_prefix: {
        prefix: 'Bytes',
        subkeys: 'u32',
      },
      remark_with_event: {
        remark: 'Bytes',
      },
    },
  },
  /**
   * Lookup95: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'SpWeightsWeightV2Weight',
    maxBlock: 'SpWeightsWeightV2Weight',
    perClass: 'FrameSupportDispatchPerDispatchClassWeightsPerClass',
  },
  /**
   * Lookup96: frame_support::dispatch::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportDispatchPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass',
  },
  /**
   * Lookup97: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'SpWeightsWeightV2Weight',
    maxExtrinsic: 'Option<SpWeightsWeightV2Weight>',
    maxTotal: 'Option<SpWeightsWeightV2Weight>',
    reserved: 'Option<SpWeightsWeightV2Weight>',
  },
  /**
   * Lookup99: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportDispatchPerDispatchClassU32',
  },
  /**
   * Lookup100: frame_support::dispatch::PerDispatchClass<T>
   **/
  FrameSupportDispatchPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32',
  },
  /**
   * Lookup101: sp_weights::RuntimeDbWeight
   **/
  SpWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64',
  },
  /**
   * Lookup102: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32',
    stateVersion: 'u8',
  },
  /**
   * Lookup107: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: [
      'InvalidSpecName',
      'SpecVersionNeedsToIncrease',
      'FailedToExtractRuntimeVersion',
      'NonDefaultComposite',
      'NonZeroRefCount',
      'CallFiltered',
    ],
  },
  /**
   * Lookup108: pallet_duniter_account::pallet::Call<T>
   **/
  PalletDuniterAccountCall: {
    _enum: ['unlink_identity'],
  },
  /**
   * Lookup111: pallet_scheduler::Scheduled<Name, frame_support::traits::preimages::Bounded<gdev_runtime::RuntimeCall>, BlockNumber, gdev_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduled: {
    maybeId: 'Option<[u8;32]>',
    priority: 'u8',
    call: 'FrameSupportPreimagesBounded',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'GdevRuntimeOriginCaller',
  },
  /**
   * Lookup112: frame_support::traits::preimages::Bounded<gdev_runtime::RuntimeCall>
   **/
  FrameSupportPreimagesBounded: {
    _enum: {
      Legacy: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      Inline: 'Bytes',
      Lookup: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
        len: 'u32',
      },
    },
  },
  /**
   * Lookup114: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: '[u8;32]',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      cancel_named: {
        id: '[u8;32]',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
      schedule_named_after: {
        id: '[u8;32]',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'Call',
      },
    },
  },
  /**
   * Lookup116: pallet_babe::pallet::Call<T>
   **/
  PalletBabeCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusSlotsEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      plan_config_change: {
        config: 'SpConsensusBabeDigestsNextConfigDescriptor',
      },
    },
  },
  /**
   * Lookup117: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader',
  },
  /**
   * Lookup118: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest',
  },
  /**
   * Lookup119: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup120: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup122: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32',
  },
  /**
   * Lookup123: sp_consensus_babe::digests::NextConfigDescriptor
   **/
  SpConsensusBabeDigestsNextConfigDescriptor: {
    _enum: {
      __Unused0: 'Null',
      V1: {
        c: '(u64,u64)',
        allowedSlots: 'SpConsensusBabeAllowedSlots',
      },
    },
  },
  /**
   * Lookup125: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots'],
  },
  /**
   * Lookup126: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>',
      },
    },
  },
  /**
   * Lookup127: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer_allow_death: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      set_balance_deprecated: {
        who: 'MultiAddress',
        newFree: 'Compact<u64>',
        oldReserved: 'Compact<u64>',
      },
      force_transfer: {
        source: 'MultiAddress',
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_all: {
        dest: 'MultiAddress',
        keepAlive: 'bool',
      },
      force_unreserve: {
        who: 'MultiAddress',
        amount: 'u64',
      },
      upgrade_accounts: {
        who: 'Vec<AccountId32>',
      },
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      force_set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u64>',
      },
    },
  },
  /**
   * Lookup132: pallet_oneshot_account::pallet::Call<T>
   **/
  PalletOneshotAccountCall: {
    _enum: {
      create_oneshot_account: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      consume_oneshot_account: {
        blockHeight: 'u32',
        dest: 'PalletOneshotAccountAccount',
      },
      consume_oneshot_account_with_remaining: {
        blockHeight: 'u32',
        dest: 'PalletOneshotAccountAccount',
        remainingTo: 'PalletOneshotAccountAccount',
        balance: 'Compact<u64>',
      },
    },
  },
  /**
   * Lookup133: pallet_oneshot_account::types::Account<sp_runtime::multiaddress::MultiAddress<sp_core::crypto::AccountId32, AccountIndex>>
   **/
  PalletOneshotAccountAccount: {
    _enum: {
      Normal: 'MultiAddress',
      Oneshot: 'MultiAddress',
    },
  },
  /**
   * Lookup134: pallet_authority_members::pallet::Call<T>
   **/
  PalletAuthorityMembersCall: {
    _enum: {
      go_offline: 'Null',
      go_online: 'Null',
      set_session_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'GdevRuntimeOpaqueSessionKeys',
      },
      remove_member: {
        memberId: 'u32',
      },
      remove_member_from_blacklist: {
        memberId: 'u32',
      },
    },
  },
  /**
   * Lookup135: gdev_runtime::opaque::SessionKeys
   **/
  GdevRuntimeOpaqueSessionKeys: {
    grandpa: 'SpConsensusGrandpaAppPublic',
    babe: 'SpConsensusBabeAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    authorityDiscovery: 'SpAuthorityDiscoveryAppPublic',
  },
  /**
   * Lookup136: sp_authority_discovery::app::Public
   **/
  SpAuthorityDiscoveryAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup137: pallet_session::pallet::Call<T>
   **/
  PalletSessionCall: {
    _enum: {
      set_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: 'GdevRuntimeOpaqueSessionKeys',
        proof: 'Bytes',
      },
      purge_keys: 'Null',
    },
  },
  /**
   * Lookup138: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpConsensusGrandpaEquivocationProof',
        keyOwnerProof: 'SpSessionMembershipProof',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32',
      },
    },
  },
  /**
   * Lookup139: sp_consensus_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpConsensusGrandpaEquivocation',
  },
  /**
   * Lookup140: sp_consensus_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpConsensusGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit',
    },
  },
  /**
   * Lookup141: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpConsensusGrandpaAppSignature)',
  },
  /**
   * Lookup142: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32',
  },
  /**
   * Lookup143: sp_consensus_grandpa::app::Signature
   **/
  SpConsensusGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup144: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup147: finality_grandpa::Equivocation<sp_consensus_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_consensus_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpConsensusGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpConsensusGrandpaAppSignature)',
  },
  /**
   * Lookup148: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32',
  },
  /**
   * Lookup150: pallet_im_online::pallet::Call<T>
   **/
  PalletImOnlineCall: {
    _enum: {
      heartbeat: {
        heartbeat: 'PalletImOnlineHeartbeat',
        signature: 'PalletImOnlineSr25519AppSr25519Signature',
      },
    },
  },
  /**
   * Lookup151: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    networkState: 'SpCoreOffchainOpaqueNetworkState',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32',
  },
  /**
   * Lookup152: sp_core::offchain::OpaqueNetworkState
   **/
  SpCoreOffchainOpaqueNetworkState: {
    peerId: 'OpaquePeerId',
    externalAddresses: 'Vec<OpaqueMultiaddr>',
  },
  /**
   * Lookup156: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup157: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup158: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call',
      },
    },
  },
  /**
   * Lookup159: pallet_upgrade_origin::pallet::Call<T>
   **/
  PalletUpgradeOriginCall: {
    _enum: {
      dispatch_as_root: {
        call: 'Call',
      },
      dispatch_as_root_unchecked_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
      },
    },
  },
  /**
   * Lookup160: pallet_preimage::pallet::Call<T>
   **/
  PalletPreimageCall: {
    _enum: {
      note_preimage: {
        bytes: 'Bytes',
      },
      unnote_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      request_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
      unrequest_preimage: {
        _alias: {
          hash_: 'hash',
        },
        hash_: 'H256',
      },
    },
  },
  /**
   * Lookup161: pallet_collective::pallet::Call<T, I>
   **/
  PalletCollectiveCall: {
    _enum: {
      set_members: {
        newMembers: 'Vec<AccountId32>',
        prime: 'Option<AccountId32>',
        oldCount: 'u32',
      },
      execute: {
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      propose: {
        threshold: 'Compact<u32>',
        proposal: 'Call',
        lengthBound: 'Compact<u32>',
      },
      vote: {
        proposal: 'H256',
        index: 'Compact<u32>',
        approve: 'bool',
      },
      __Unused4: 'Null',
      disapprove_proposal: {
        proposalHash: 'H256',
      },
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'SpWeightsWeightV2Weight',
        lengthBound: 'Compact<u32>',
      },
    },
  },
  /**
   * Lookup162: pallet_universal_dividend::pallet::Call<T>
   **/
  PalletUniversalDividendCall: {
    _enum: {
      claim_uds: 'Null',
      transfer_ud: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_ud_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
    },
  },
  /**
   * Lookup163: pallet_identity::pallet::Call<T>
   **/
  PalletIdentityCall: {
    _enum: {
      create_identity: {
        ownerKey: 'AccountId32',
      },
      confirm_identity: {
        idtyName: 'Text',
      },
      validate_identity: {
        idtyIndex: 'u32',
      },
      change_owner_key: {
        newKey: 'AccountId32',
        newKeySig: 'SpRuntimeMultiSignature',
      },
      revoke_identity: {
        idtyIndex: 'u32',
        revocationKey: 'AccountId32',
        revocationSig: 'SpRuntimeMultiSignature',
      },
      remove_identity: {
        idtyIndex: 'u32',
        idtyName: 'Option<Text>',
        reason: 'PalletIdentityIdtyRemovalReason',
      },
      prune_item_identities_names: {
        names: 'Vec<Text>',
      },
      fix_sufficients: {
        ownerKey: 'AccountId32',
        inc: 'bool',
      },
      link_account: {
        accountId: 'AccountId32',
        payloadSig: 'SpRuntimeMultiSignature',
      },
    },
  },
  /**
   * Lookup164: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature',
    },
  },
  /**
   * Lookup165: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup169: pallet_membership::pallet::Call<T, I>
   **/
  PalletMembershipCall: {
    _enum: ['request_membership', 'claim_membership', 'renew_membership', 'revoke_membership'],
  },
  /**
   * Lookup170: pallet_certification::pallet::Call<T, I>
   **/
  PalletCertificationCall: {
    _enum: {
      add_cert: {
        issuer: 'u32',
        receiver: 'u32',
      },
      del_cert: {
        issuer: 'u32',
        receiver: 'u32',
      },
      remove_all_certs_received_by: {
        idtyIndex: 'u32',
      },
    },
  },
  /**
   * Lookup171: pallet_distance::pallet::Call<T>
   **/
  PalletDistanceCall: {
    _enum: {
      request_distance_evaluation: 'Null',
      update_evaluation: {
        computationResult: 'SpDistanceComputationResult',
      },
      force_update_evaluation: {
        evaluator: 'AccountId32',
        computationResult: 'SpDistanceComputationResult',
      },
      force_set_distance_status: {
        identity: 'u32',
        status: 'Option<(AccountId32,PalletDistanceDistanceStatus)>',
      },
    },
  },
  /**
   * Lookup172: sp_distance::ComputationResult
   **/
  SpDistanceComputationResult: {
    distances: 'Vec<Perbill>',
  },
  /**
   * Lookup177: pallet_distance::types::DistanceStatus
   **/
  PalletDistanceDistanceStatus: {
    _enum: ['Pending', 'Valid'],
  },
  /**
   * Lookup180: pallet_atomic_swap::pallet::Call<T>
   **/
  PalletAtomicSwapCall: {
    _enum: {
      create_swap: {
        target: 'AccountId32',
        hashedProof: '[u8;32]',
        action: 'PalletAtomicSwapBalanceSwapAction',
        duration: 'u32',
      },
      claim_swap: {
        proof: 'Bytes',
        action: 'PalletAtomicSwapBalanceSwapAction',
      },
      cancel_swap: {
        target: 'AccountId32',
        hashedProof: '[u8;32]',
      },
    },
  },
  /**
   * Lookup181: pallet_multisig::pallet::Call<T>
   **/
  PalletMultisigCall: {
    _enum: {
      as_multi_threshold_1: {
        otherSignatories: 'Vec<AccountId32>',
        call: 'Call',
      },
      as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        call: 'Call',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'SpWeightsWeightV2Weight',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]',
      },
    },
  },
  /**
   * Lookup183: pallet_provide_randomness::pallet::Call<T>
   **/
  PalletProvideRandomnessCall: {
    _enum: {
      request: {
        randomnessType: 'PalletProvideRandomnessRandomnessType',
        salt: 'H256',
      },
    },
  },
  /**
   * Lookup184: pallet_proxy::pallet::Call<T>
   **/
  PalletProxyCall: {
    _enum: {
      proxy: {
        real: 'MultiAddress',
        forceProxyType: 'Option<GdevRuntimeProxyType>',
        call: 'Call',
      },
      add_proxy: {
        delegate: 'MultiAddress',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxy: {
        delegate: 'MultiAddress',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxies: 'Null',
      create_pure: {
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
        index: 'u16',
      },
      kill_pure: {
        spawner: 'MultiAddress',
        proxyType: 'GdevRuntimeProxyType',
        index: 'u16',
        height: 'Compact<u32>',
        extIndex: 'Compact<u32>',
      },
      announce: {
        real: 'MultiAddress',
        callHash: 'H256',
      },
      remove_announcement: {
        real: 'MultiAddress',
        callHash: 'H256',
      },
      reject_announcement: {
        delegate: 'MultiAddress',
        callHash: 'H256',
      },
      proxy_announced: {
        delegate: 'MultiAddress',
        real: 'MultiAddress',
        forceProxyType: 'Option<GdevRuntimeProxyType>',
        call: 'Call',
      },
    },
  },
  /**
   * Lookup186: pallet_utility::pallet::Call<T>
   **/
  PalletUtilityCall: {
    _enum: {
      batch: {
        calls: 'Vec<Call>',
      },
      as_derivative: {
        index: 'u16',
        call: 'Call',
      },
      batch_all: {
        calls: 'Vec<Call>',
      },
      dispatch_as: {
        asOrigin: 'GdevRuntimeOriginCaller',
        call: 'Call',
      },
      force_batch: {
        calls: 'Vec<Call>',
      },
      with_weight: {
        call: 'Call',
        weight: 'SpWeightsWeightV2Weight',
      },
    },
  },
  /**
   * Lookup188: gdev_runtime::OriginCaller
   **/
  GdevRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSupportDispatchRawOrigin',
      __Unused1: 'Null',
      Void: 'SpCoreVoid',
      __Unused3: 'Null',
      __Unused4: 'Null',
      __Unused5: 'Null',
      __Unused6: 'Null',
      __Unused7: 'Null',
      __Unused8: 'Null',
      __Unused9: 'Null',
      __Unused10: 'Null',
      __Unused11: 'Null',
      __Unused12: 'Null',
      __Unused13: 'Null',
      __Unused14: 'Null',
      __Unused15: 'Null',
      __Unused16: 'Null',
      __Unused17: 'Null',
      __Unused18: 'Null',
      __Unused19: 'Null',
      __Unused20: 'Null',
      __Unused21: 'Null',
      __Unused22: 'Null',
      TechnicalCommittee: 'PalletCollectiveRawOrigin',
    },
  },
  /**
   * Lookup189: frame_support::dispatch::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSupportDispatchRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null',
    },
  },
  /**
   * Lookup190: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null',
    },
  },
  /**
   * Lookup191: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup192: pallet_treasury::pallet::Call<T, I>
   **/
  PalletTreasuryCall: {
    _enum: {
      propose_spend: {
        value: 'Compact<u64>',
        beneficiary: 'MultiAddress',
      },
      reject_proposal: {
        proposalId: 'Compact<u32>',
      },
      approve_proposal: {
        proposalId: 'Compact<u32>',
      },
      spend: {
        amount: 'Compact<u64>',
        beneficiary: 'MultiAddress',
      },
      remove_approval: {
        proposalId: 'Compact<u32>',
      },
    },
  },
  /**
   * Lookup195: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange', 'Named'],
  },
  /**
   * Lookup202: sp_consensus_babe::digests::PreDigest
   **/
  SpConsensusBabeDigestsPreDigest: {
    _enum: {
      __Unused0: 'Null',
      Primary: 'SpConsensusBabeDigestsPrimaryPreDigest',
      SecondaryPlain: 'SpConsensusBabeDigestsSecondaryPlainPreDigest',
      SecondaryVRF: 'SpConsensusBabeDigestsSecondaryVRFPreDigest',
    },
  },
  /**
   * Lookup203: sp_consensus_babe::digests::PrimaryPreDigest
   **/
  SpConsensusBabeDigestsPrimaryPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfSignature: 'SpCoreSr25519VrfVrfSignature',
  },
  /**
   * Lookup204: sp_core::sr25519::vrf::VrfSignature
   **/
  SpCoreSr25519VrfVrfSignature: {
    output: '[u8;32]',
    proof: '[u8;64]',
  },
  /**
   * Lookup205: sp_consensus_babe::digests::SecondaryPlainPreDigest
   **/
  SpConsensusBabeDigestsSecondaryPlainPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
  },
  /**
   * Lookup206: sp_consensus_babe::digests::SecondaryVRFPreDigest
   **/
  SpConsensusBabeDigestsSecondaryVRFPreDigest: {
    authorityIndex: 'u32',
    slot: 'u64',
    vrfSignature: 'SpCoreSr25519VrfVrfSignature',
  },
  /**
   * Lookup207: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots',
  },
  /**
   * Lookup211: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport', 'InvalidConfiguration'],
  },
  /**
   * Lookup212: pallet_duniter_test_parameters::types::Parameters<BlockNumber, CertCount, PeriodCount>
   **/
  PalletDuniterTestParametersParameters: {
    babeEpochDuration: 'u64',
    certPeriod: 'u32',
    certMaxByIssuer: 'u32',
    certMinReceivedCertToIssueCert: 'u32',
    certValidityPeriod: 'u32',
    idtyConfirmPeriod: 'u32',
    idtyCreationPeriod: 'u32',
    membershipPeriod: 'u32',
    pendingMembershipPeriod: 'u32',
    udCreationPeriod: 'u64',
    udReevalPeriod: 'u64',
    smithCertPeriod: 'u32',
    smithCertMaxByIssuer: 'u32',
    smithCertMinReceivedCertToIssueCert: 'u32',
    smithCertValidityPeriod: 'u32',
    smithMembershipPeriod: 'u32',
    smithPendingMembershipPeriod: 'u32',
    smithWotFirstCertIssuableOn: 'u32',
    smithWotMinCertForMembership: 'u32',
    wotFirstCertIssuableOn: 'u32',
    wotMinCertForCreateIdtyRight: 'u32',
    wotMinCertForMembership: 'u32',
  },
  /**
   * Lookup213: pallet_balances::types::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u64',
    reserved: 'u64',
    frozen: 'u64',
    flags: 'u128',
  },
  /**
   * Lookup217: pallet_balances::types::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u64',
    reasons: 'PalletBalancesReasons',
  },
  /**
   * Lookup218: pallet_balances::types::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All'],
  },
  /**
   * Lookup221: pallet_balances::types::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u64',
  },
  /**
   * Lookup224: pallet_balances::types::IdAmount<Id, Balance>
   **/
  PalletBalancesIdAmount: {
    id: 'Null',
    amount: 'u64',
  },
  /**
   * Lookup226: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: [
      'VestingBalance',
      'LiquidityRestrictions',
      'InsufficientBalance',
      'ExistentialDeposit',
      'Expendability',
      'ExistingVestingSchedule',
      'DeadAccount',
      'TooManyReserves',
      'TooManyHolds',
      'TooManyFreezes',
    ],
  },
  /**
   * Lookup228: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2'],
  },
  /**
   * Lookup229: pallet_oneshot_account::pallet::Error<T>
   **/
  PalletOneshotAccountError: {
    _enum: [
      'BlockHeightInFuture',
      'BlockHeightTooOld',
      'DestAccountNotExist',
      'ExistentialDeposit',
      'InsufficientBalance',
      'OneshotAccountAlreadyCreated',
      'OneshotAccountNotExist',
    ],
  },
  /**
   * Lookup230: pallet_quota::pallet::Quota<BlockNumber, Balance>
   **/
  PalletQuotaQuota: {
    lastUse: 'u32',
    amount: 'u64',
  },
  /**
   * Lookup232: pallet_quota::pallet::Refund<sp_core::crypto::AccountId32, IdtyId, Balance>
   **/
  PalletQuotaRefund: {
    account: 'AccountId32',
    identity: 'u32',
    amount: 'u64',
  },
  /**
   * Lookup234: pallet_authority_members::types::MemberData<sp_core::crypto::AccountId32>
   **/
  PalletAuthorityMembersMemberData: {
    ownerKey: 'AccountId32',
  },
  /**
   * Lookup235: pallet_authority_members::pallet::Error<T>
   **/
  PalletAuthorityMembersError: {
    _enum: [
      'AlreadyIncoming',
      'AlreadyOnline',
      'AlreadyOutgoing',
      'MemberIdNotFound',
      'MemberIdBlackListed',
      'MemberNotBlackListed',
      'MemberNotFound',
      'NotOnlineNorIncoming',
      'NotOwner',
      'NotMember',
      'SessionKeysNotProvided',
      'TooManyAuthorities',
    ],
  },
  /**
   * Lookup236: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,CommonRuntimeEntitiesValidatorFullIdentification)',
    reporters: 'Vec<AccountId32>',
  },
  /**
   * Lookup241: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup242: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount'],
  },
  /**
   * Lookup243: pallet_grandpa::StoredState<N>
   **/
  PalletGrandpaStoredState: {
    _enum: {
      Live: 'Null',
      PendingPause: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
      Paused: 'Null',
      PendingResume: {
        scheduledAt: 'u32',
        delay: 'u32',
      },
    },
  },
  /**
   * Lookup244: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpConsensusGrandpaAppPublic,u64)>',
    forced: 'Option<u32>',
  },
  /**
   * Lookup246: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: [
      'PauseFailed',
      'ResumeFailed',
      'ChangePending',
      'TooSoon',
      'InvalidKeyOwnershipProof',
      'InvalidEquivocationProof',
      'DuplicateOffenceReport',
    ],
  },
  /**
   * Lookup250: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
   **/
  PalletImOnlineBoundedOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>',
  },
  /**
   * Lookup255: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat'],
  },
  /**
   * Lookup256: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo'],
  },
  /**
   * Lookup257: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: {
        deposit: '(AccountId32,u64)',
        len: 'u32',
      },
      Requested: {
        deposit: 'Option<(AccountId32,u64)>',
        count: 'u32',
        len: 'Option<u32>',
      },
    },
  },
  /**
   * Lookup260: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooBig', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested'],
  },
  /**
   * Lookup262: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32',
  },
  /**
   * Lookup263: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: [
      'NotMember',
      'DuplicateProposal',
      'ProposalMissing',
      'WrongIndex',
      'DuplicateVote',
      'AlreadyInitialized',
      'TooEarly',
      'TooManyProposals',
      'WrongProposalWeight',
      'WrongProposalLength',
    ],
  },
  /**
   * Lookup267: pallet_universal_dividend::pallet::Error<T>
   **/
  PalletUniversalDividendError: {
    _enum: ['AccountNotAllowedToClaimUds'],
  },
  /**
   * Lookup268: pallet_duniter_wot::pallet::Error<T, I>
   **/
  PalletDuniterWotError: {
    _enum: [
      'NotEnoughCertsToClaimMembership',
      'DistanceNotOK',
      'IdtyNotAllowedToRequestMembership',
      'IdtyNotAllowedToRenewMembership',
      'IdtyCreationPeriodNotRespected',
      'NotEnoughReceivedCertsToCreateIdty',
      'MaxEmittedCertsReached',
      'NotAllowedToChangeIdtyAddress',
      'NotAllowedToRemoveIdty',
      'IssuerCanNotEmitCert',
      'CertToUndefined',
      'IdtyNotFound',
    ],
  },
  /**
   * Lookup269: pallet_identity::types::IdtyValue<BlockNumber, sp_core::crypto::AccountId32, common_runtime::entities::IdtyData>
   **/
  PalletIdentityIdtyValue: {
    data: 'CommonRuntimeEntitiesIdtyData',
    nextCreatableIdentityOn: 'u32',
    oldOwnerKey: 'Option<(AccountId32,u32)>',
    ownerKey: 'AccountId32',
    removableOn: 'u32',
    status: 'PalletIdentityIdtyStatus',
  },
  /**
   * Lookup270: common_runtime::entities::IdtyData
   **/
  CommonRuntimeEntitiesIdtyData: {
    firstEligibleUd: 'u16',
  },
  /**
   * Lookup273: pallet_identity::types::IdtyStatus
   **/
  PalletIdentityIdtyStatus: {
    _enum: ['Created', 'ConfirmedByOwner', 'Validated'],
  },
  /**
   * Lookup276: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: [
      'IdtyAlreadyConfirmed',
      'IdtyAlreadyCreated',
      'IdtyAlreadyValidated',
      'IdtyCreationNotAllowed',
      'IdtyIndexNotFound',
      'IdtyNameAlreadyExist',
      'IdtyNameInvalid',
      'IdtyNotConfirmedByOwner',
      'IdtyNotFound',
      'IdtyNotMember',
      'IdtyNotValidated',
      'IdtyNotYetRenewable',
      'InvalidSignature',
      'InvalidRevocationKey',
      'NotRespectIdtyCreationPeriod',
      'NotSameIdtyName',
      'OwnerKeyAlreadyRecentlyChanged',
      'OwnerKeyAlreadyUsed',
      'ProhibitedToRevertToAnOldKey',
      'RightAlreadyAdded',
      'RightNotExist',
    ],
  },
  /**
   * Lookup277: sp_membership::MembershipData<BlockNumber>
   **/
  SpMembershipMembershipData: {
    expireOn: 'u32',
  },
  /**
   * Lookup278: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: [
      'IdtyIdNotFound',
      'MembershipAlreadyAcquired',
      'MembershipAlreadyRequested',
      'MembershipNotFound',
      'OriginNotAllowedToUseIdty',
      'MembershipRequestNotFound',
    ],
  },
  /**
   * Lookup279: pallet_certification::types::IdtyCertMeta<BlockNumber>
   **/
  PalletCertificationIdtyCertMeta: {
    issuedCount: 'u32',
    nextIssuableOn: 'u32',
    receivedCount: 'u32',
  },
  /**
   * Lookup280: pallet_certification::pallet::Error<T, I>
   **/
  PalletCertificationError: {
    _enum: ['CannotCertifySelf', 'IssuedTooManyCert', 'IssuerNotFound', 'NotEnoughCertReceived', 'NotRespectCertPeriod'],
  },
  /**
   * Lookup281: pallet_distance::types::EvaluationPool<sp_core::crypto::AccountId32, IdtyIndex>
   **/
  PalletDistanceEvaluationPool: {
    evaluations: 'Vec<(u32,PalletDistanceMedianMedianAcc)>',
    evaluators: 'BTreeSet<AccountId32>',
  },
  /**
   * Lookup284: pallet_distance::median::MedianAcc<sp_arithmetic::per_things::Perbill>
   **/
  PalletDistanceMedianMedianAcc: {
    samples: 'Vec<(Perbill,u32)>',
    medianIndex: 'Option<u32>',
    medianSubindex: 'u32',
  },
  /**
   * Lookup292: pallet_distance::pallet::Error<T>
   **/
  PalletDistanceError: {
    _enum: [
      'AlreadyInEvaluation',
      'CannotReserve',
      'ManyEvaluationsByAuthor',
      'ManyEvaluationsInBlock',
      'NoAuthor',
      'NoIdentity',
      'NonEligibleForEvaluation',
      'QueueFull',
      'TooManyEvaluators',
      'WrongResultLength',
    ],
  },
  /**
   * Lookup297: pallet_atomic_swap::pallet::Error<T>
   **/
  PalletAtomicSwapError: {
    _enum: [
      'AlreadyExist',
      'InvalidProof',
      'ProofTooLarge',
      'SourceMismatch',
      'AlreadyClaimed',
      'NotExist',
      'ClaimActionMismatch',
      'DurationNotPassed',
    ],
  },
  /**
   * Lookup298: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32, MaxApprovals>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u64',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>',
  },
  /**
   * Lookup300: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: [
      'MinimumThreshold',
      'AlreadyApproved',
      'NoApprovalsNeeded',
      'TooFewSignatories',
      'TooManySignatories',
      'SignatoriesOutOfOrder',
      'SenderInSignatories',
      'NotFound',
      'NotOwner',
      'NoTimepoint',
      'WrongTimepoint',
      'UnexpectedTimepoint',
      'MaxWeightTooLow',
      'AlreadyStored',
    ],
  },
  /**
   * Lookup302: pallet_provide_randomness::types::Request
   **/
  PalletProvideRandomnessRequest: {
    requestId: 'u64',
    salt: 'H256',
  },
  /**
   * Lookup303: pallet_provide_randomness::pallet::Error<T>
   **/
  PalletProvideRandomnessError: {
    _enum: ['FullQueue'],
  },
  /**
   * Lookup306: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, gdev_runtime::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'GdevRuntimeProxyType',
    delay: 'u32',
  },
  /**
   * Lookup310: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32',
  },
  /**
   * Lookup312: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy'],
  },
  /**
   * Lookup313: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls'],
  },
  /**
   * Lookup314: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u64',
    beneficiary: 'AccountId32',
    bond: 'u64',
  },
  /**
   * Lookup318: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup319: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals', 'InsufficientPermission', 'ProposalNotApproved'],
  },
  /**
   * Lookup322: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup323: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup324: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup325: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup328: pallet_oneshot_account::check_nonce::CheckNonce<gdev_runtime::Runtime>
   **/
  PalletOneshotAccountCheckNonce: 'FrameSystemExtensionsCheckNonce',
  /**
   * Lookup329: gdev_runtime::Runtime
   **/
  GdevRuntimeRuntime: 'Null',
  /**
   * Lookup330: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup331: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup332: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u64>',
};
