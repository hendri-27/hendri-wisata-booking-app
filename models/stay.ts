export type StayAvailabilityResponse = {
  property_id: string,
  offer_summary_data: object | null,
  offer_list: Array<StayAvailabilityModel> | [],
}

export type StayAvailabilityModel = {
  offer_id: string,
  price_total: number,
  rate_nightly: number,
  room_name: string,
  room_available: string,
  room_bed_groups: string,
  room_size_sqm: number,
  room_images: Array<{
    caption: string,
    size_sm: string,
  }>,
  meal_plan_code: string,
  meal_plan_description: string,
  cancel_policy_code: string,
  cancel_policy_deadline: string,
  cancel_policy_description: string,
  price_check_href: string,
  tax: number,
  tax_rate: number,
  xcode_log: {
    id: string,
    status: string,
    available_rooms: number,
    refundable: boolean,
    member_deal_available: boolean,
    sale_scenario: {
      package: boolean,
      member: boolean,
      corporate: boolean,
      distribution: boolean,
    },
    merchant_of_record: string,
    amenities: { [id: string] : {
      id: string,
      name: string,
    }},
    links: {
      payment_options: {
        method: string,
        href: string,
      }
    },
    bed_groups: { [id: string]: {
      id: string,
      description: string,
      links: {
        price_check: {
          method: string,
          href: string,
        }
      },
      configuration: {
        type: string,
        size: string,
        quantity: number,
      }
    }},
    cancel_penalties: {
      start: string,
      end: string,
      nights: string,
      currency: string,
    },
    occupancy_pricing: { [id: string]: {
      nightly: Array<Array<{
        type: string,
        value: string,
        currency: string,
      }>>,
      totals: {
        gross_profit: {
          billable_currency: { [id: string]: {
            billable_currency: {
              value: string,
              currency: string,
            },
            request_currency: {
              value: string,
              currency: string,
            }
          }}
        }
      }
    }},

  },
  room_data: {
    is_mapped: boolean,
    is_decoded: boolean,
    id: string,
  },
  pricing_data: {
    strikethrough_rate_nightly: string | null,
    strikethrough_price_total: string | null,
    rate_nightly: number,
    price_total: number,
    cashback_rate: number,
    cashback_pct: number,
    net_rate_nightly: number,
    net_price_total: number,
    bonus_cashback_rate: number,
    bonus_cashback_pct: number,
    net_rate_nightly_with_bonus: number,
    net_price_total_with_bonus: number,
    wisata_point: number,
    saving_pct: number,
  }
}

export type RoomModel = {
  offer_id: string,
  price_total: number,
  rate_nightly: number,
  room_name: string,
  room_available: string,
  room_bed_groups: string,
  room_size_sqm: number,
  room_images: Array<{
    caption: string,
    size_sm: string,
  }>,
  room_data: {
    is_mapped: boolean,
    is_decoded: boolean,
    id: string,
  },
  grouped_rooms: Array<StayAvailabilityModel>,
}