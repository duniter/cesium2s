// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

/* eslint-disable sort-keys */

export default {
  /**
   * Lookup3: frame_system::AccountInfo<Index, pallet_duniter_account::types::AccountData<Balance>>
   **/
  FrameSystemAccountInfo: {
    nonce: 'u32',
    consumers: 'u32',
    providers: 'u32',
    sufficients: 'u32',
    data: 'PalletDuniterAccountAccountData'
  },
  /**
   * Lookup5: pallet_duniter_account::types::AccountData<Balance>
   **/
  PalletDuniterAccountAccountData: {
    randomId: 'Option<H256>',
    free: 'u64',
    reserved: 'u64',
    feeFrozen: 'u64'
  },
  /**
   * Lookup9: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU64: {
    normal: 'u64',
    operational: 'u64',
    mandatory: 'u64'
  },
  /**
   * Lookup11: sp_runtime::generic::digest::Digest
   **/
  SpRuntimeDigest: {
    logs: 'Vec<SpRuntimeDigestDigestItem>'
  },
  /**
   * Lookup13: sp_runtime::generic::digest::DigestItem
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
      RuntimeEnvironmentUpdated: 'Null'
    }
  },
  /**
   * Lookup16: frame_system::EventRecord<gdev_runtime::Event, primitive_types::H256>
   **/
  FrameSystemEventRecord: {
    phase: 'FrameSystemPhase',
    event: 'Event',
    topics: 'Vec<H256>'
  },
  /**
   * Lookup18: frame_system::pallet::Event<T>
   **/
  FrameSystemEvent: {
    _enum: {
      ExtrinsicSuccess: {
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
      },
      ExtrinsicFailed: {
        dispatchError: 'SpRuntimeDispatchError',
        dispatchInfo: 'FrameSupportWeightsDispatchInfo',
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
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup19: frame_support::weights::DispatchInfo
   **/
  FrameSupportWeightsDispatchInfo: {
    weight: 'u64',
    class: 'FrameSupportWeightsDispatchClass',
    paysFee: 'FrameSupportWeightsPays'
  },
  /**
   * Lookup20: frame_support::weights::DispatchClass
   **/
  FrameSupportWeightsDispatchClass: {
    _enum: ['Normal', 'Operational', 'Mandatory']
  },
  /**
   * Lookup21: frame_support::weights::Pays
   **/
  FrameSupportWeightsPays: {
    _enum: ['Yes', 'No']
  },
  /**
   * Lookup22: sp_runtime::DispatchError
   **/
  SpRuntimeDispatchError: {
    _enum: {
      Other: 'Null',
      CannotLookup: 'Null',
      BadOrigin: 'Null',
      Module: {
        index: 'u8',
        error: 'u8',
      },
      ConsumerRemaining: 'Null',
      NoProviders: 'Null',
      TooManyConsumers: 'Null',
      Token: 'SpRuntimeTokenError',
      Arithmetic: 'SpRuntimeArithmeticError'
    }
  },
  /**
   * Lookup23: sp_runtime::TokenError
   **/
  SpRuntimeTokenError: {
    _enum: ['NoFunds', 'WouldDie', 'BelowMinimum', 'CannotCreate', 'UnknownAsset', 'Frozen', 'Unsupported']
  },
  /**
   * Lookup24: sp_runtime::ArithmeticError
   **/
  SpRuntimeArithmeticError: {
    _enum: ['Underflow', 'Overflow', 'DivisionByZero']
  },
  /**
   * Lookup25: pallet_duniter_account::pallet::Event<T>
   **/
  PalletDuniterAccountEvent: {
    _enum: {
      ForceDestroy: {
        who: 'AccountId32',
        balance: 'u64',
      },
      RandomIdAssigned: {
        who: 'AccountId32',
        randomId: 'H256'
      }
    }
  },
  /**
   * Lookup26: pallet_scheduler::pallet::Event<T>
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
        id: 'Option<Bytes>',
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      CallLookupFailed: {
        task: '(u32,u32)',
        id: 'Option<Bytes>',
        error: 'FrameSupportScheduleLookupError'
      }
    }
  },
  /**
   * Lookup31: frame_support::traits::schedule::LookupError
   **/
  FrameSupportScheduleLookupError: {
    _enum: ['Unknown', 'BadFormat']
  },
  /**
   * Lookup32: pallet_balances::pallet::Event<T, I>
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
        reserved: 'u64',
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
        amount: 'u64'
      }
    }
  },
  /**
   * Lookup33: frame_support::traits::tokens::misc::BalanceStatus
   **/
  FrameSupportTokensMiscBalanceStatus: {
    _enum: ['Free', 'Reserved']
  },
  /**
   * Lookup34: pallet_authority_members::pallet::Event<T>
   **/
  PalletAuthorityMembersEvent: {
    _enum: {
      IncomingAuthorities: 'Vec<u32>',
      OutgoingAuthorities: 'Vec<u32>',
      MemberGoOffline: 'u32',
      MemberGoOnline: 'u32',
      MemberRemoved: 'u32'
    }
  },
  /**
   * Lookup36: pallet_offences::pallet::Event
   **/
  PalletOffencesEvent: {
    _enum: {
      Offence: {
        kind: '[u8;16]',
        timeslot: 'Bytes'
      }
    }
  },
  /**
   * Lookup38: pallet_session::pallet::Event
   **/
  PalletSessionEvent: {
    _enum: {
      NewSession: {
        sessionIndex: 'u32'
      }
    }
  },
  /**
   * Lookup39: pallet_grandpa::pallet::Event
   **/
  PalletGrandpaEvent: {
    _enum: {
      NewAuthorities: {
        authoritySet: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
      },
      Paused: 'Null',
      Resumed: 'Null'
    }
  },
  /**
   * Lookup42: sp_finality_grandpa::app::Public
   **/
  SpFinalityGrandpaAppPublic: 'SpCoreEd25519Public',
  /**
   * Lookup43: sp_core::ed25519::Public
   **/
  SpCoreEd25519Public: '[u8;32]',
  /**
   * Lookup44: pallet_im_online::pallet::Event<T>
   **/
  PalletImOnlineEvent: {
    _enum: {
      HeartbeatReceived: {
        authorityId: 'PalletImOnlineSr25519AppSr25519Public',
      },
      AllGood: 'Null',
      SomeOffline: {
        offline: 'Vec<(AccountId32,CommonRuntimeEntitiesValidatorFullIdentification)>'
      }
    }
  },
  /**
   * Lookup45: pallet_im_online::sr25519::app_sr25519::Public
   **/
  PalletImOnlineSr25519AppSr25519Public: 'SpCoreSr25519Public',
  /**
   * Lookup46: sp_core::sr25519::Public
   **/
  SpCoreSr25519Public: '[u8;32]',
  /**
   * Lookup49: common_runtime::entities::ValidatorFullIdentification
   **/
  CommonRuntimeEntitiesValidatorFullIdentification: 'Null',
  /**
   * Lookup50: pallet_sudo::pallet::Event<T>
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
        sudoResult: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup52: pallet_upgrade_origin::pallet::Event
   **/
  PalletUpgradeOriginEvent: {
    _enum: {
      DispatchedAsRoot: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup53: pallet_preimage::pallet::Event<T>
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
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup54: pallet_universal_dividend::pallet::Event<T>
   **/
  PalletUniversalDividendEvent: {
    _enum: {
      NewUdCreated: {
        amount: 'u64',
        monetaryMass: 'u64',
        membersCount: 'u64',
      },
      UdReevalued: {
        newUdAmount: 'u64',
        monetaryMass: 'u64',
        membersCount: 'u64'
      }
    }
  },
  /**
   * Lookup55: pallet_identity::pallet::Event<T>
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
      IdtyRemoved: {
        idtyIndex: 'u32'
      }
    }
  },
  /**
   * Lookup57: pallet_membership::pallet::Event<T, I>
   **/
  PalletMembershipEvent: {
    _enum: {
      MembershipAcquired: 'u32',
      MembershipExpired: 'u32',
      MembershipRenewed: 'u32',
      MembershipRequested: 'u32',
      MembershipRevoked: 'u32',
      PendingMembershipExpired: 'u32'
    }
  },
  /**
   * Lookup58: pallet_certification::pallet::Event<T, I>
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
        receiver: 'u32'
      }
    }
  },
  /**
   * Lookup62: pallet_collective::pallet::Event<T, I>
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
        no: 'u32'
      }
    }
  },
  /**
   * Lookup63: pallet_atomic_swap::pallet::Event<T>
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
        proof: '[u8;32]'
      }
    }
  },
  /**
   * Lookup64: pallet_atomic_swap::PendingSwap<T>
   **/
  PalletAtomicSwapPendingSwap: {
    source: 'AccountId32',
    action: 'PalletAtomicSwapBalanceSwapAction',
    endBlock: 'u32'
  },
  /**
   * Lookup65: pallet_atomic_swap::BalanceSwapAction<sp_core::crypto::AccountId32, C>
   **/
  PalletAtomicSwapBalanceSwapAction: {
    value: 'u64'
  },
  /**
   * Lookup66: pallet_multisig::pallet::Event<T>
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
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup67: pallet_multisig::Timepoint<BlockNumber>
   **/
  PalletMultisigTimepoint: {
    height: 'u32',
    index: 'u32'
  },
  /**
   * Lookup68: pallet_provide_randomness::pallet::Event
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
        r_type: 'PalletProvideRandomnessRandomnessType'
      }
    }
  },
  /**
   * Lookup69: pallet_provide_randomness::types::RandomnessType
   **/
  PalletProvideRandomnessRandomnessType: {
    _enum: ['RandomnessFromPreviousBlock', 'RandomnessFromOneEpochAgo', 'RandomnessFromTwoEpochsAgo']
  },
  /**
   * Lookup70: pallet_proxy::pallet::Event<T>
   **/
  PalletProxyEvent: {
    _enum: {
      ProxyExecuted: {
        result: 'Result<Null, SpRuntimeDispatchError>',
      },
      AnonymousCreated: {
        anonymous: 'AccountId32',
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
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup71: gdev_runtime::ProxyType
   **/
  GdevRuntimeProxyType: {
    _enum: ['Any', 'TransferOnly', 'CancelProxy', 'SmithsCollectivePropose']
  },
  /**
   * Lookup73: pallet_utility::pallet::Event
   **/
  PalletUtilityEvent: {
    _enum: {
      BatchInterrupted: {
        index: 'u32',
        error: 'SpRuntimeDispatchError',
      },
      BatchCompleted: 'Null',
      ItemCompleted: 'Null',
      DispatchedAs: {
        result: 'Result<Null, SpRuntimeDispatchError>'
      }
    }
  },
  /**
   * Lookup74: pallet_treasury::pallet::Event<T, I>
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
        value: 'u64'
      }
    }
  },
  /**
   * Lookup75: frame_system::Phase
   **/
  FrameSystemPhase: {
    _enum: {
      ApplyExtrinsic: 'u32',
      Finalization: 'Null',
      Initialization: 'Null'
    }
  },
  /**
   * Lookup78: frame_system::LastRuntimeUpgradeInfo
   **/
  FrameSystemLastRuntimeUpgradeInfo: {
    specVersion: 'Compact<u32>',
    specName: 'Text'
  },
  /**
   * Lookup80: frame_system::pallet::Call<T>
   **/
  FrameSystemCall: {
    _enum: {
      fill_block: {
        ratio: 'Perbill',
      },
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
        remark: 'Bytes'
      }
    }
  },
  /**
   * Lookup85: frame_system::limits::BlockWeights
   **/
  FrameSystemLimitsBlockWeights: {
    baseBlock: 'u64',
    maxBlock: 'u64',
    perClass: 'FrameSupportWeightsPerDispatchClassWeightsPerClass'
  },
  /**
   * Lookup86: frame_support::weights::PerDispatchClass<frame_system::limits::WeightsPerClass>
   **/
  FrameSupportWeightsPerDispatchClassWeightsPerClass: {
    normal: 'FrameSystemLimitsWeightsPerClass',
    operational: 'FrameSystemLimitsWeightsPerClass',
    mandatory: 'FrameSystemLimitsWeightsPerClass'
  },
  /**
   * Lookup87: frame_system::limits::WeightsPerClass
   **/
  FrameSystemLimitsWeightsPerClass: {
    baseExtrinsic: 'u64',
    maxExtrinsic: 'Option<u64>',
    maxTotal: 'Option<u64>',
    reserved: 'Option<u64>'
  },
  /**
   * Lookup89: frame_system::limits::BlockLength
   **/
  FrameSystemLimitsBlockLength: {
    max: 'FrameSupportWeightsPerDispatchClassU32'
  },
  /**
   * Lookup90: frame_support::weights::PerDispatchClass<T>
   **/
  FrameSupportWeightsPerDispatchClassU32: {
    normal: 'u32',
    operational: 'u32',
    mandatory: 'u32'
  },
  /**
   * Lookup91: frame_support::weights::RuntimeDbWeight
   **/
  FrameSupportWeightsRuntimeDbWeight: {
    read: 'u64',
    write: 'u64'
  },
  /**
   * Lookup92: sp_version::RuntimeVersion
   **/
  SpVersionRuntimeVersion: {
    specName: 'Text',
    implName: 'Text',
    authoringVersion: 'u32',
    specVersion: 'u32',
    implVersion: 'u32',
    apis: 'Vec<([u8;8],u32)>',
    transactionVersion: 'u32'
  },
  /**
   * Lookup97: frame_system::pallet::Error<T>
   **/
  FrameSystemError: {
    _enum: ['InvalidSpecName', 'SpecVersionNeedsToIncrease', 'FailedToExtractRuntimeVersion', 'NonDefaultComposite', 'NonZeroRefCount', 'CallFiltered']
  },
  /**
   * Lookup100: pallet_scheduler::ScheduledV3<frame_support::traits::schedule::MaybeHashed<gdev_runtime::Call, primitive_types::H256>, BlockNumber, gdev_runtime::OriginCaller, sp_core::crypto::AccountId32>
   **/
  PalletSchedulerScheduledV3: {
    maybeId: 'Option<Bytes>',
    priority: 'u8',
    call: 'FrameSupportScheduleMaybeHashed',
    maybePeriodic: 'Option<(u32,u32)>',
    origin: 'GdevRuntimeOriginCaller'
  },
  /**
   * Lookup101: frame_support::traits::schedule::MaybeHashed<gdev_runtime::Call, primitive_types::H256>
   **/
  FrameSupportScheduleMaybeHashed: {
    _enum: {
      Value: 'Call',
      Hash: 'H256'
    }
  },
  /**
   * Lookup103: pallet_scheduler::pallet::Call<T>
   **/
  PalletSchedulerCall: {
    _enum: {
      schedule: {
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel: {
        when: 'u32',
        index: 'u32',
      },
      schedule_named: {
        id: 'Bytes',
        when: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      cancel_named: {
        id: 'Bytes',
      },
      schedule_after: {
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed',
      },
      schedule_named_after: {
        id: 'Bytes',
        after: 'u32',
        maybePeriodic: 'Option<(u32,u32)>',
        priority: 'u8',
        call: 'FrameSupportScheduleMaybeHashed'
      }
    }
  },
  /**
   * Lookup105: pallet_babe::pallet::Call<T>
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
        config: 'SpConsensusBabeDigestsNextConfigDescriptor'
      }
    }
  },
  /**
   * Lookup106: sp_consensus_slots::EquivocationProof<sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>, sp_consensus_babe::app::Public>
   **/
  SpConsensusSlotsEquivocationProof: {
    offender: 'SpConsensusBabeAppPublic',
    slot: 'u64',
    firstHeader: 'SpRuntimeHeader',
    secondHeader: 'SpRuntimeHeader'
  },
  /**
   * Lookup107: sp_runtime::generic::header::Header<Number, sp_runtime::traits::BlakeTwo256>
   **/
  SpRuntimeHeader: {
    parentHash: 'H256',
    number: 'Compact<u32>',
    stateRoot: 'H256',
    extrinsicsRoot: 'H256',
    digest: 'SpRuntimeDigest'
  },
  /**
   * Lookup108: sp_runtime::traits::BlakeTwo256
   **/
  SpRuntimeBlakeTwo256: 'Null',
  /**
   * Lookup109: sp_consensus_babe::app::Public
   **/
  SpConsensusBabeAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup111: sp_session::MembershipProof
   **/
  SpSessionMembershipProof: {
    session: 'u32',
    trieNodes: 'Vec<Bytes>',
    validatorCount: 'u32'
  },
  /**
   * Lookup112: sp_consensus_babe::digests::NextConfigDescriptor
   **/
  SpConsensusBabeDigestsNextConfigDescriptor: {
    _enum: {
      __Unused0: 'Null',
      V1: {
        c: '(u64,u64)',
        allowedSlots: 'SpConsensusBabeAllowedSlots'
      }
    }
  },
  /**
   * Lookup114: sp_consensus_babe::AllowedSlots
   **/
  SpConsensusBabeAllowedSlots: {
    _enum: ['PrimarySlots', 'PrimaryAndSecondaryPlainSlots', 'PrimaryAndSecondaryVRFSlots']
  },
  /**
   * Lookup115: pallet_timestamp::pallet::Call<T>
   **/
  PalletTimestampCall: {
    _enum: {
      set: {
        now: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup117: pallet_balances::pallet::Call<T, I>
   **/
  PalletBalancesCall: {
    _enum: {
      transfer: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      set_balance: {
        who: 'MultiAddress',
        newFree: 'Compact<u64>',
        newReserved: 'Compact<u64>',
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
        amount: 'u64'
      }
    }
  },
  /**
   * Lookup121: pallet_authority_members::pallet::Call<T>
   **/
  PalletAuthorityMembersCall: {
    _enum: {
      go_offline: 'Null',
      go_online: 'Null',
      set_session_keys: {
        _alias: {
          keys_: 'keys',
        },
        keys_: '[u8;128]',
      },
      prune_account_id_of: {
        membersIds: 'Vec<u32>',
      },
      remove_member: {
        memberId: 'u32'
      }
    }
  },
  /**
   * Lookup123: pallet_authorship::pallet::Call<T>
   **/
  PalletAuthorshipCall: {
    _enum: {
      set_uncles: {
        newUncles: 'Vec<SpRuntimeHeader>'
      }
    }
  },
  /**
   * Lookup125: pallet_session::pallet::Call<T>
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
      purge_keys: 'Null'
    }
  },
  /**
   * Lookup126: gdev_runtime::opaque::SessionKeys
   **/
  GdevRuntimeOpaqueSessionKeys: {
    grandpa: 'SpFinalityGrandpaAppPublic',
    babe: 'SpConsensusBabeAppPublic',
    imOnline: 'PalletImOnlineSr25519AppSr25519Public',
    authorityDiscovery: 'SpAuthorityDiscoveryAppPublic'
  },
  /**
   * Lookup127: sp_authority_discovery::app::Public
   **/
  SpAuthorityDiscoveryAppPublic: 'SpCoreSr25519Public',
  /**
   * Lookup128: pallet_grandpa::pallet::Call<T>
   **/
  PalletGrandpaCall: {
    _enum: {
      report_equivocation: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      report_equivocation_unsigned: {
        equivocationProof: 'SpFinalityGrandpaEquivocationProof',
        keyOwnerProof: 'SpCoreVoid',
      },
      note_stalled: {
        delay: 'u32',
        bestFinalizedBlockNumber: 'u32'
      }
    }
  },
  /**
   * Lookup129: sp_finality_grandpa::EquivocationProof<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocationProof: {
    setId: 'u64',
    equivocation: 'SpFinalityGrandpaEquivocation'
  },
  /**
   * Lookup130: sp_finality_grandpa::Equivocation<primitive_types::H256, N>
   **/
  SpFinalityGrandpaEquivocation: {
    _enum: {
      Prevote: 'FinalityGrandpaEquivocationPrevote',
      Precommit: 'FinalityGrandpaEquivocationPrecommit'
    }
  },
  /**
   * Lookup131: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Prevote<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrevote: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrevote,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup132: finality_grandpa::Prevote<primitive_types::H256, N>
   **/
  FinalityGrandpaPrevote: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup133: sp_finality_grandpa::app::Signature
   **/
  SpFinalityGrandpaAppSignature: 'SpCoreEd25519Signature',
  /**
   * Lookup134: sp_core::ed25519::Signature
   **/
  SpCoreEd25519Signature: '[u8;64]',
  /**
   * Lookup137: finality_grandpa::Equivocation<sp_finality_grandpa::app::Public, finality_grandpa::Precommit<primitive_types::H256, N>, sp_finality_grandpa::app::Signature>
   **/
  FinalityGrandpaEquivocationPrecommit: {
    roundNumber: 'u64',
    identity: 'SpFinalityGrandpaAppPublic',
    first: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)',
    second: '(FinalityGrandpaPrecommit,SpFinalityGrandpaAppSignature)'
  },
  /**
   * Lookup138: finality_grandpa::Precommit<primitive_types::H256, N>
   **/
  FinalityGrandpaPrecommit: {
    targetHash: 'H256',
    targetNumber: 'u32'
  },
  /**
   * Lookup140: sp_core::Void
   **/
  SpCoreVoid: 'Null',
  /**
   * Lookup141: pallet_im_online::pallet::Call<T>
   **/
  PalletImOnlineCall: {
    _enum: {
      heartbeat: {
        heartbeat: 'PalletImOnlineHeartbeat',
        signature: 'PalletImOnlineSr25519AppSr25519Signature'
      }
    }
  },
  /**
   * Lookup142: pallet_im_online::Heartbeat<BlockNumber>
   **/
  PalletImOnlineHeartbeat: {
    blockNumber: 'u32',
    networkState: 'SpCoreOffchainOpaqueNetworkState',
    sessionIndex: 'u32',
    authorityIndex: 'u32',
    validatorsLen: 'u32'
  },
  /**
   * Lookup143: sp_core::offchain::OpaqueNetworkState
   **/
  SpCoreOffchainOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup147: pallet_im_online::sr25519::app_sr25519::Signature
   **/
  PalletImOnlineSr25519AppSr25519Signature: 'SpCoreSr25519Signature',
  /**
   * Lookup148: sp_core::sr25519::Signature
   **/
  SpCoreSr25519Signature: '[u8;64]',
  /**
   * Lookup149: pallet_sudo::pallet::Call<T>
   **/
  PalletSudoCall: {
    _enum: {
      sudo: {
        call: 'Call',
      },
      sudo_unchecked_weight: {
        call: 'Call',
        weight: 'u64',
      },
      set_key: {
        _alias: {
          new_: 'new',
        },
        new_: 'MultiAddress',
      },
      sudo_as: {
        who: 'MultiAddress',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup150: pallet_upgrade_origin::pallet::Call<T>
   **/
  PalletUpgradeOriginCall: {
    _enum: {
      dispatch_as_root: {
        call: 'Call',
      },
      dispatch_as_root_unchecked_weight: {
        call: 'Call',
        weight: 'u64'
      }
    }
  },
  /**
   * Lookup151: pallet_preimage::pallet::Call<T>
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
        hash_: 'H256'
      }
    }
  },
  /**
   * Lookup152: pallet_universal_dividend::pallet::Call<T>
   **/
  PalletUniversalDividendCall: {
    _enum: {
      transfer_ud: {
        dest: 'MultiAddress',
        value: 'Compact<u64>',
      },
      transfer_ud_keep_alive: {
        dest: 'MultiAddress',
        value: 'Compact<u64>'
      }
    }
  },
  /**
   * Lookup153: pallet_identity::pallet::Call<T>
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
      revoke_identity: {
        payload: 'PalletIdentityRevocationPayload',
        payloadSig: 'SpRuntimeMultiSignature',
      },
      remove_identity: {
        idtyIndex: 'u32',
        idtyName: 'Option<Text>',
      },
      prune_item_identities_names: {
        names: 'Vec<Text>',
      },
      prune_item_identity_index_of: {
        accountsIds: 'Vec<AccountId32>'
      }
    }
  },
  /**
   * Lookup154: pallet_identity::types::RevocationPayload<sp_core::crypto::AccountId32, primitive_types::H256>
   **/
  PalletIdentityRevocationPayload: {
    ownerKey: 'AccountId32',
    genesisHash: 'H256'
  },
  /**
   * Lookup155: sp_runtime::MultiSignature
   **/
  SpRuntimeMultiSignature: {
    _enum: {
      Ed25519: 'SpCoreEd25519Signature',
      Sr25519: 'SpCoreSr25519Signature',
      Ecdsa: 'SpCoreEcdsaSignature'
    }
  },
  /**
   * Lookup156: sp_core::ecdsa::Signature
   **/
  SpCoreEcdsaSignature: '[u8;65]',
  /**
   * Lookup161: pallet_membership::pallet::Call<T, I>
   **/
  PalletMembershipCall: {
    _enum: {
      force_request_membership: {
        idtyId: 'u32',
        metadata: 'AccountId32',
      },
      request_membership: {
        metadata: 'AccountId32',
      },
      claim_membership: {
        maybeIdtyId: 'Option<u32>',
      },
      renew_membership: {
        maybeIdtyId: 'Option<u32>',
      },
      revoke_membership: {
        maybeIdtyId: 'Option<u32>'
      }
    }
  },
  /**
   * Lookup164: pallet_certification::pallet::Call<T, I>
   **/
  PalletCertificationCall: {
    _enum: {
      force_add_cert: {
        issuer: 'u32',
        receiver: 'u32',
        verifyRules: 'bool',
      },
      add_cert: {
        receiver: 'AccountId32',
      },
      del_cert: {
        issuer: 'u32',
        receiver: 'u32',
      },
      remove_all_certs_received_by: {
        idtyIndex: 'u32'
      }
    }
  },
  /**
   * Lookup166: common_runtime::entities::SmithsMembershipMetaData<SessionKeysWrapper>
   **/
  CommonRuntimeEntitiesSmithsMembershipMetaData: {
    ownerKey: 'AccountId32',
    p2pEndpoint: 'Text',
    sessionKeys: '[u8;128]'
  },
  /**
   * Lookup168: pallet_collective::pallet::Call<T, I>
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
      close: {
        proposalHash: 'H256',
        index: 'Compact<u32>',
        proposalWeightBound: 'Compact<u64>',
        lengthBound: 'Compact<u32>',
      },
      disapprove_proposal: {
        proposalHash: 'H256'
      }
    }
  },
  /**
   * Lookup169: pallet_atomic_swap::pallet::Call<T>
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
        hashedProof: '[u8;32]'
      }
    }
  },
  /**
   * Lookup170: pallet_multisig::pallet::Call<T>
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
        call: 'WrapperKeepOpaque<Call>',
        storeCall: 'bool',
        maxWeight: 'u64',
      },
      approve_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        maybeTimepoint: 'Option<PalletMultisigTimepoint>',
        callHash: '[u8;32]',
        maxWeight: 'u64',
      },
      cancel_as_multi: {
        threshold: 'u16',
        otherSignatories: 'Vec<AccountId32>',
        timepoint: 'PalletMultisigTimepoint',
        callHash: '[u8;32]'
      }
    }
  },
  /**
   * Lookup173: pallet_provide_randomness::pallet::Call<T>
   **/
  PalletProvideRandomnessCall: {
    _enum: {
      request: {
        randomnessType: 'PalletProvideRandomnessRandomnessType',
        salt: 'H256'
      }
    }
  },
  /**
   * Lookup174: pallet_proxy::pallet::Call<T>
   **/
  PalletProxyCall: {
    _enum: {
      proxy: {
        real: 'AccountId32',
        forceProxyType: 'Option<GdevRuntimeProxyType>',
        call: 'Call',
      },
      add_proxy: {
        delegate: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxy: {
        delegate: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
      },
      remove_proxies: 'Null',
      anonymous: {
        proxyType: 'GdevRuntimeProxyType',
        delay: 'u32',
        index: 'u16',
      },
      kill_anonymous: {
        spawner: 'AccountId32',
        proxyType: 'GdevRuntimeProxyType',
        index: 'u16',
        height: 'Compact<u32>',
        extIndex: 'Compact<u32>',
      },
      announce: {
        real: 'AccountId32',
        callHash: 'H256',
      },
      remove_announcement: {
        real: 'AccountId32',
        callHash: 'H256',
      },
      reject_announcement: {
        delegate: 'AccountId32',
        callHash: 'H256',
      },
      proxy_announced: {
        delegate: 'AccountId32',
        real: 'AccountId32',
        forceProxyType: 'Option<GdevRuntimeProxyType>',
        call: 'Call'
      }
    }
  },
  /**
   * Lookup176: pallet_utility::pallet::Call<T>
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
        call: 'Call'
      }
    }
  },
  /**
   * Lookup178: gdev_runtime::OriginCaller
   **/
  GdevRuntimeOriginCaller: {
    _enum: {
      system: 'FrameSystemRawOrigin',
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
      __Unused23: 'Null',
      __Unused24: 'Null',
      __Unused25: 'Null',
      __Unused26: 'Null',
      __Unused27: 'Null',
      __Unused28: 'Null',
      __Unused29: 'Null',
      __Unused30: 'Null',
      __Unused31: 'Null',
      __Unused32: 'Null',
      __Unused33: 'Null',
      __Unused34: 'Null',
      __Unused35: 'Null',
      __Unused36: 'Null',
      __Unused37: 'Null',
      __Unused38: 'Null',
      __Unused39: 'Null',
      __Unused40: 'Null',
      __Unused41: 'Null',
      __Unused42: 'Null',
      __Unused43: 'Null',
      __Unused44: 'Null',
      __Unused45: 'Null',
      __Unused46: 'Null',
      __Unused47: 'Null',
      __Unused48: 'Null',
      __Unused49: 'Null',
      __Unused50: 'Null',
      __Unused51: 'Null',
      __Unused52: 'Null',
      __Unused53: 'Null',
      SmithsCollective: 'PalletCollectiveRawOrigin'
    }
  },
  /**
   * Lookup179: frame_system::RawOrigin<sp_core::crypto::AccountId32>
   **/
  FrameSystemRawOrigin: {
    _enum: {
      Root: 'Null',
      Signed: 'AccountId32',
      None: 'Null'
    }
  },
  /**
   * Lookup180: pallet_collective::RawOrigin<sp_core::crypto::AccountId32, I>
   **/
  PalletCollectiveRawOrigin: {
    _enum: {
      Members: '(u32,u32)',
      Member: 'AccountId32',
      _Phantom: 'Null'
    }
  },
  /**
   * Lookup181: pallet_treasury::pallet::Call<T, I>
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
        proposalId: 'Compact<u32>'
      }
    }
  },
  /**
   * Lookup182: pallet_scheduler::pallet::Error<T>
   **/
  PalletSchedulerError: {
    _enum: ['FailedToSchedule', 'NotFound', 'TargetBlockNumberInPast', 'RescheduleNoChange']
  },
  /**
   * Lookup189: sp_consensus_babe::BabeEpochConfiguration
   **/
  SpConsensusBabeBabeEpochConfiguration: {
    c: '(u64,u64)',
    allowedSlots: 'SpConsensusBabeAllowedSlots'
  },
  /**
   * Lookup190: pallet_babe::pallet::Error<T>
   **/
  PalletBabeError: {
    _enum: ['InvalidEquivocationProof', 'InvalidKeyOwnershipProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup191: pallet_duniter_test_parameters::types::Parameters<BlockNumber, CertCount, PeriodCount>
   **/
  PalletDuniterTestParametersParameters: {
    babeEpochDuration: 'u64',
    certPeriod: 'u32',
    certMaxByIssuer: 'u32',
    certMinReceivedCertToIssueCert: 'u32',
    certRenewablePeriod: 'u32',
    certValidityPeriod: 'u32',
    idtyConfirmPeriod: 'u32',
    idtyCreationPeriod: 'u32',
    membershipPeriod: 'u32',
    membershipRenewablePeriod: 'u32',
    pendingMembershipPeriod: 'u32',
    udCreationPeriod: 'u32',
    udReevalPeriod: 'u32',
    smithCertPeriod: 'u32',
    smithCertMaxByIssuer: 'u32',
    smithCertMinReceivedCertToIssueCert: 'u32',
    smithCertRenewablePeriod: 'u32',
    smithCertValidityPeriod: 'u32',
    smithMembershipPeriod: 'u32',
    smithMembershipRenewablePeriod: 'u32',
    smithPendingMembershipPeriod: 'u32',
    smithsWotFirstCertIssuableOn: 'u32',
    smithsWotMinCertForMembership: 'u32',
    wotFirstCertIssuableOn: 'u32',
    wotMinCertForCreateIdtyRight: 'u32',
    wotMinCertForMembership: 'u32'
  },
  /**
   * Lookup192: pallet_balances::AccountData<Balance>
   **/
  PalletBalancesAccountData: {
    free: 'u64',
    reserved: 'u64',
    miscFrozen: 'u64',
    feeFrozen: 'u64'
  },
  /**
   * Lookup194: pallet_balances::BalanceLock<Balance>
   **/
  PalletBalancesBalanceLock: {
    id: '[u8;8]',
    amount: 'u64',
    reasons: 'PalletBalancesReasons'
  },
  /**
   * Lookup195: pallet_balances::Reasons
   **/
  PalletBalancesReasons: {
    _enum: ['Fee', 'Misc', 'All']
  },
  /**
   * Lookup198: pallet_balances::ReserveData<ReserveIdentifier, Balance>
   **/
  PalletBalancesReserveData: {
    id: '[u8;8]',
    amount: 'u64'
  },
  /**
   * Lookup200: pallet_balances::Releases
   **/
  PalletBalancesReleases: {
    _enum: ['V1_0_0', 'V2_0_0']
  },
  /**
   * Lookup201: pallet_balances::pallet::Error<T, I>
   **/
  PalletBalancesError: {
    _enum: ['VestingBalance', 'LiquidityRestrictions', 'InsufficientBalance', 'ExistentialDeposit', 'KeepAlive', 'ExistingVestingSchedule', 'DeadAccount', 'TooManyReserves']
  },
  /**
   * Lookup204: pallet_transaction_payment::Releases
   **/
  PalletTransactionPaymentReleases: {
    _enum: ['V1Ancient', 'V2']
  },
  /**
   * Lookup206: frame_support::weights::WeightToFeeCoefficient<Balance>
   **/
  FrameSupportWeightsWeightToFeeCoefficient: {
    coeffInteger: 'u64',
    coeffFrac: 'Perbill',
    negative: 'bool',
    degree: 'u8'
  },
  /**
   * Lookup207: pallet_authority_members::types::MemberData<sp_core::crypto::AccountId32>
   **/
  PalletAuthorityMembersMemberData: {
    expireOnSession: 'u32',
    mustRotateKeysBefore: 'u32',
    ownerKey: 'AccountId32'
  },
  /**
   * Lookup208: pallet_authority_members::pallet::Error<T>
   **/
  PalletAuthorityMembersError: {
    _enum: ['AlreadyIncoming', 'AlreadyOnline', 'AlreadyOutgoing', 'MemberIdNotFound', 'MemberNotFound', 'NotOnlineNorIncoming', 'NotOwner', 'NotMember', 'SessionKeysNotProvided', 'TooManyAuthorities']
  },
  /**
   * Lookup210: pallet_authorship::UncleEntryItem<BlockNumber, primitive_types::H256, sp_core::crypto::AccountId32>
   **/
  PalletAuthorshipUncleEntryItem: {
    _enum: {
      InclusionHeight: 'u32',
      Uncle: '(H256,Option<AccountId32>)'
    }
  },
  /**
   * Lookup211: pallet_authorship::pallet::Error<T>
   **/
  PalletAuthorshipError: {
    _enum: ['InvalidUncleParent', 'UnclesAlreadySet', 'TooManyUncles', 'GenesisUncle', 'TooHighUncle', 'UncleAlreadyIncluded', 'OldUncle']
  },
  /**
   * Lookup212: sp_staking::offence::OffenceDetails<sp_core::crypto::AccountId32, Offender>
   **/
  SpStakingOffenceOffenceDetails: {
    offender: '(AccountId32,CommonRuntimeEntitiesValidatorFullIdentification)',
    reporters: 'Vec<AccountId32>'
  },
  /**
   * Lookup217: sp_core::crypto::KeyTypeId
   **/
  SpCoreCryptoKeyTypeId: '[u8;4]',
  /**
   * Lookup218: pallet_session::pallet::Error<T>
   **/
  PalletSessionError: {
    _enum: ['InvalidProof', 'NoAssociatedValidatorId', 'DuplicatedKey', 'NoKeys', 'NoAccount']
  },
  /**
   * Lookup219: pallet_grandpa::StoredState<N>
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
        delay: 'u32'
      }
    }
  },
  /**
   * Lookup220: pallet_grandpa::StoredPendingChange<N, Limit>
   **/
  PalletGrandpaStoredPendingChange: {
    scheduledAt: 'u32',
    delay: 'u32',
    nextAuthorities: 'Vec<(SpFinalityGrandpaAppPublic,u64)>',
    forced: 'Option<u32>'
  },
  /**
   * Lookup222: pallet_grandpa::pallet::Error<T>
   **/
  PalletGrandpaError: {
    _enum: ['PauseFailed', 'ResumeFailed', 'ChangePending', 'TooSoon', 'InvalidKeyOwnershipProof', 'InvalidEquivocationProof', 'DuplicateOffenceReport']
  },
  /**
   * Lookup226: pallet_im_online::BoundedOpaqueNetworkState<PeerIdEncodingLimit, MultiAddrEncodingLimit, AddressesLimit>
   **/
  PalletImOnlineBoundedOpaqueNetworkState: {
    peerId: 'Bytes',
    externalAddresses: 'Vec<Bytes>'
  },
  /**
   * Lookup231: pallet_im_online::pallet::Error<T>
   **/
  PalletImOnlineError: {
    _enum: ['InvalidKey', 'DuplicatedHeartbeat']
  },
  /**
   * Lookup232: pallet_sudo::pallet::Error<T>
   **/
  PalletSudoError: {
    _enum: ['RequireSudo']
  },
  /**
   * Lookup233: pallet_preimage::RequestStatus<sp_core::crypto::AccountId32, Balance>
   **/
  PalletPreimageRequestStatus: {
    _enum: {
      Unrequested: 'Option<(AccountId32,u64)>',
      Requested: 'u32'
    }
  },
  /**
   * Lookup237: pallet_preimage::pallet::Error<T>
   **/
  PalletPreimageError: {
    _enum: ['TooLarge', 'AlreadyNoted', 'NotAuthorized', 'NotNoted', 'Requested', 'NotRequested']
  },
  /**
   * Lookup238: pallet_identity::types::IdtyValue<BlockNumber, sp_core::crypto::AccountId32>
   **/
  PalletIdentityIdtyValue: {
    nextCreatableIdentityOn: 'u32',
    ownerKey: 'AccountId32',
    removableOn: 'u32',
    status: 'PalletIdentityIdtyStatus'
  },
  /**
   * Lookup239: pallet_identity::types::IdtyStatus
   **/
  PalletIdentityIdtyStatus: {
    _enum: ['Created', 'ConfirmedByOwner', 'Validated']
  },
  /**
   * Lookup242: pallet_identity::pallet::Error<T>
   **/
  PalletIdentityError: {
    _enum: ['InvalidGenesisHash', 'InvalidRevocationProof', 'CreatorNotAllowedToCreateIdty', 'IdtyAlreadyConfirmed', 'IdtyAlreadyCreated', 'IdtyAlreadyValidated', 'IdtyCreationNotAllowed', 'IdtyIndexNotFound', 'IdtyNameAlreadyExist', 'IdtyNameInvalid', 'IdtyNotConfirmedByOwner', 'IdtyNotFound', 'IdtyNotMember', 'IdtyNotValidated', 'IdtyNotYetRenewable', 'NotAllowedToConfirmIdty', 'NotAllowedToValidateIdty', 'NotSameIdtyName', 'RightAlreadyAdded', 'RightNotExist', 'NotRespectIdtyCreationPeriod']
  },
  /**
   * Lookup243: sp_membership::MembershipData<BlockNumber>
   **/
  SpMembershipMembershipData: {
    expireOn: 'u32',
    renewableOn: 'u32'
  },
  /**
   * Lookup244: pallet_membership::pallet::Error<T, I>
   **/
  PalletMembershipError: {
    _enum: ['IdtyNotAllowedToRequestMembership', 'IdtyNotAllowedToRenewMembership', 'InvalidMetaData', 'IdtyIdNotFound', 'MembershipAlreadyAcquired', 'MembershipAlreadyRequested', 'MembershipNotYetRenewable', 'MembershipNotFound', 'OriginNotAllowedToUseIdty', 'MembershipRequestNotFound', 'MembershipRevokedRecently']
  },
  /**
   * Lookup245: pallet_certification::types::IdtyCertMeta<BlockNumber>
   **/
  PalletCertificationIdtyCertMeta: {
    issuedCount: 'u32',
    nextIssuableOn: 'u32',
    receivedCount: 'u32'
  },
  /**
   * Lookup246: pallet_certification::types::CertValue<BlockNumber>
   **/
  PalletCertificationCertValue: {
    renewableOn: 'u32',
    removableOn: 'u32'
  },
  /**
   * Lookup247: pallet_certification::pallet::Error<T, I>
   **/
  PalletCertificationError: {
    _enum: ['CannotCertifySelf', 'CertNotAllowed', 'IdtyMustReceiveCertsBeforeCanIssue', 'IssuedTooManyCert', 'IssuerNotFound', 'NotEnoughCertReceived', 'NotRespectCertPeriod', 'NotRespectRenewablePeriod', 'ReceiverNotFound']
  },
  /**
   * Lookup251: pallet_collective::Votes<sp_core::crypto::AccountId32, BlockNumber>
   **/
  PalletCollectiveVotes: {
    index: 'u32',
    threshold: 'u32',
    ayes: 'Vec<AccountId32>',
    nays: 'Vec<AccountId32>',
    end: 'u32'
  },
  /**
   * Lookup252: pallet_collective::pallet::Error<T, I>
   **/
  PalletCollectiveError: {
    _enum: ['NotMember', 'DuplicateProposal', 'ProposalMissing', 'WrongIndex', 'DuplicateVote', 'AlreadyInitialized', 'TooEarly', 'TooManyProposals', 'WrongProposalWeight', 'WrongProposalLength']
  },
  /**
   * Lookup254: pallet_atomic_swap::pallet::Error<T>
   **/
  PalletAtomicSwapError: {
    _enum: ['AlreadyExist', 'InvalidProof', 'ProofTooLarge', 'SourceMismatch', 'AlreadyClaimed', 'NotExist', 'ClaimActionMismatch', 'DurationNotPassed']
  },
  /**
   * Lookup255: pallet_multisig::Multisig<BlockNumber, Balance, sp_core::crypto::AccountId32>
   **/
  PalletMultisigMultisig: {
    when: 'PalletMultisigTimepoint',
    deposit: 'u64',
    depositor: 'AccountId32',
    approvals: 'Vec<AccountId32>'
  },
  /**
   * Lookup257: pallet_multisig::pallet::Error<T>
   **/
  PalletMultisigError: {
    _enum: ['MinimumThreshold', 'AlreadyApproved', 'NoApprovalsNeeded', 'TooFewSignatories', 'TooManySignatories', 'SignatoriesOutOfOrder', 'SenderInSignatories', 'NotFound', 'NotOwner', 'NoTimepoint', 'WrongTimepoint', 'UnexpectedTimepoint', 'MaxWeightTooLow', 'AlreadyStored']
  },
  /**
   * Lookup259: pallet_provide_randomness::types::Request
   **/
  PalletProvideRandomnessRequest: {
    requestId: 'u64',
    salt: 'H256'
  },
  /**
   * Lookup260: pallet_provide_randomness::pallet::Error<T>
   **/
  PalletProvideRandomnessError: {
    _enum: ['FullQueue']
  },
  /**
   * Lookup263: pallet_proxy::ProxyDefinition<sp_core::crypto::AccountId32, gdev_runtime::ProxyType, BlockNumber>
   **/
  PalletProxyProxyDefinition: {
    delegate: 'AccountId32',
    proxyType: 'GdevRuntimeProxyType',
    delay: 'u32'
  },
  /**
   * Lookup267: pallet_proxy::Announcement<sp_core::crypto::AccountId32, primitive_types::H256, BlockNumber>
   **/
  PalletProxyAnnouncement: {
    real: 'AccountId32',
    callHash: 'H256',
    height: 'u32'
  },
  /**
   * Lookup269: pallet_proxy::pallet::Error<T>
   **/
  PalletProxyError: {
    _enum: ['TooMany', 'NotFound', 'NotProxy', 'Unproxyable', 'Duplicate', 'NoPermission', 'Unannounced', 'NoSelfProxy']
  },
  /**
   * Lookup270: pallet_utility::pallet::Error<T>
   **/
  PalletUtilityError: {
    _enum: ['TooManyCalls']
  },
  /**
   * Lookup271: pallet_treasury::Proposal<sp_core::crypto::AccountId32, Balance>
   **/
  PalletTreasuryProposal: {
    proposer: 'AccountId32',
    value: 'u64',
    beneficiary: 'AccountId32',
    bond: 'u64'
  },
  /**
   * Lookup274: frame_support::PalletId
   **/
  FrameSupportPalletId: '[u8;8]',
  /**
   * Lookup275: pallet_treasury::pallet::Error<T, I>
   **/
  PalletTreasuryError: {
    _enum: ['InsufficientProposersBalance', 'InvalidIndex', 'TooManyApprovals']
  },
  /**
   * Lookup278: frame_system::extensions::check_non_zero_sender::CheckNonZeroSender<T>
   **/
  FrameSystemExtensionsCheckNonZeroSender: 'Null',
  /**
   * Lookup279: frame_system::extensions::check_spec_version::CheckSpecVersion<T>
   **/
  FrameSystemExtensionsCheckSpecVersion: 'Null',
  /**
   * Lookup280: frame_system::extensions::check_tx_version::CheckTxVersion<T>
   **/
  FrameSystemExtensionsCheckTxVersion: 'Null',
  /**
   * Lookup281: frame_system::extensions::check_genesis::CheckGenesis<T>
   **/
  FrameSystemExtensionsCheckGenesis: 'Null',
  /**
   * Lookup284: frame_system::extensions::check_nonce::CheckNonce<T>
   **/
  FrameSystemExtensionsCheckNonce: 'Compact<u32>',
  /**
   * Lookup285: frame_system::extensions::check_weight::CheckWeight<T>
   **/
  FrameSystemExtensionsCheckWeight: 'Null',
  /**
   * Lookup286: pallet_transaction_payment::ChargeTransactionPayment<T>
   **/
  PalletTransactionPaymentChargeTransactionPayment: 'Compact<u64>',
  /**
   * Lookup287: gdev_runtime::Runtime
   **/
  GdevRuntimeRuntime: 'Null'
};
